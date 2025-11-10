// Minimal Express backend using firebase-admin
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// Initialize Firebase Admin
// You can provide credentials via GOOGLE_APPLICATION_CREDENTIALS env var
// or set FIREBASE_SERVICE_ACCOUNT to the JSON string of the service account.
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    const svc = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
      credential: admin.credential.cert(svc),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET || undefined,
    });
  } catch (e) {
    console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT JSON:', e);
    process.exit(1);
  }
} else {
  // Will use Application Default Credentials if available
  admin.initializeApp({
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || undefined,
  });
}

const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());

// Middleware: verify Firebase ID token from Authorization: Bearer <token>
async function verifyToken(req, res, next) {
  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }
  const idToken = auth.split('Bearer ')[1];
  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    req.user = decoded; // contains uid and claims
    next();
  } catch (err) {
    console.error('Token verify error', err);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// Health
app.get('/health', (req, res) => res.json({ ok: true }));

// Create booking (teacher) - uses Firestore transaction to check overlaps
app.post('/bookings', verifyToken, async (req, res) => {
  const { classroomId, start, end } = req.body;
  if (!classroomId || !start || !end) {
    return res.status(400).json({ error: 'classroomId, start and end are required' });
  }

  const startTs = admin.firestore.Timestamp.fromDate(new Date(start));
  const endTs = admin.firestore.Timestamp.fromDate(new Date(end));

  if (startTs.toMillis() >= endTs.toMillis()) {
    return res.status(400).json({ error: 'start must be before end' });
  }

  const bookingsRef = db.collection('bookings');

  try {
    const result = await db.runTransaction(async (tx) => {
      // Query bookings for the same classroom with status pending or approved
      const q = bookingsRef
        .where('classroomId', '==', classroomId)
        .where('status', 'in', ['pending', 'approved']);

      const snap = await tx.get(q);

      for (const doc of snap.docs) {
        const b = doc.data();
        const bStart = b.start;
        const bEnd = b.end;
        if (bStart && bEnd) {
          if (bStart.toMillis() < endTs.toMillis() && bEnd.toMillis() > startTs.toMillis()) {
            throw new Error('Time slot already booked or pending');
          }
        }
      }

      const newRef = bookingsRef.doc();
      const payload = {
        classroomId,
        teacherId: req.user.uid,
        start: startTs,
        end: endTs,
        status: 'pending',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      };
      tx.set(newRef, payload);
      return { id: newRef.id, ...payload };
    });

    return res.status(201).json({ bookingId: result.id });
  } catch (err) {
    console.error('Booking error:', err);
    return res.status(409).json({ error: err.message || 'Conflict creating booking' });
  }
});

// Simple endpoint to list bookings for a classroom (admin/teacher uses)
app.get('/bookings', verifyToken, async (req, res) => {
  const { classroomId } = req.query;
  const q = db.collection('bookings');
  let query = q;
  if (classroomId) query = q.where('classroomId', '==', String(classroomId));
  const snap = await query.orderBy('start', 'desc').limit(100).get();
  const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  res.json(items);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));
