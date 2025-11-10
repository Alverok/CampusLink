# CampusLink backend (Firebase-admin scaffold)

This is a minimal Express-based backend that uses the Firebase Admin SDK. It provides:
- ID token verification (clients authenticate with Firebase Auth and send ID tokens)
- A sample `/bookings` POST endpoint that uses Firestore transactions to prevent overlapping bookings

Setup
1. Create a Firebase project, enable Authentication (email/password or providers), Firestore, and Storage.
2. Create a service account and either set `GOOGLE_APPLICATION_CREDENTIALS` to the JSON file path, or set `FIREBASE_SERVICE_ACCOUNT` to the service account JSON string in environment variables.
3. Copy `.env.example` to `.env` and set values.

Run locally
1. Install dependencies:
   npm install
2. Start the server:
   npm run dev

Notes
- This scaffold uses `firebase-admin` to access Firestore and Storage. For file uploads, prefer direct client uploads to Firebase Storage using the client SDK and server-side metadata records.
- The `/bookings` endpoint assumes the client sends a Firebase ID token in `Authorization: Bearer <token>` header.
