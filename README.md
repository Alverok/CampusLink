# CampusLink

CampusLink is a unified college communication and classroom management platform (web admin + mobile app).

This README explains how to run the project locally (backend, web, and mobile) and how to configure Firebase for the MVP.

## Prerequisites

- Node.js (18+) and npm
- Flutter SDK (for the `mobile/` app) and Android/iOS toolchains if you want to run on devices
- Firebase project (Authentication, Firestore, Storage)
- Firebase CLI (optional, for local emulators and deployment)
- A Firebase service account JSON for the backend (or set up Application Default Credentials)

## Repository layout (relevant folders)

- `backend/` — Express backend scaffold using `firebase-admin` (ID token verification, booking endpoints).
- `web/` — Next.js / React web admin front-end.
- `mobile/` — Flutter mobile app.

----

## Backend (local)

1. Copy environment example and set credentials:

   - Preferred (local): download a Firebase service account JSON and set the environment variable:

     ```bash
     export GOOGLE_APPLICATION_CREDENTIALS="/path/to/serviceAccountKey.json"
     export FIREBASE_STORAGE_BUCKET="your-bucket.appspot.com"
     ```

   - Or add the JSON string to `FIREBASE_SERVICE_ACCOUNT` (not recommended for long-term):

     ```bash
     export FIREBASE_SERVICE_ACCOUNT='{"type":"service_account", ... }'
     ```

   You can copy the example file:

   ```bash
   cp backend/.env.example backend/.env
   # then edit backend/.env or set env vars in your shell
   ```

2. Install dependencies and start the server:

   ```bash
   cd backend
   npm install
   npm run dev    # nodemon (development)
   # or: npm start
   ```

3. Endpoints available (examples):

- `GET /health` — health check
- `POST /bookings` — create a booking (requires Firebase ID token in `Authorization: Bearer <idToken>`)
- `GET /bookings` — list bookings (optional `?classroomId=`)

Notes:
- The backend expects clients to authenticate with Firebase Auth and send ID tokens. The backend verifies ID tokens using `firebase-admin`.
- For file uploads (images, PDFs) prefer direct client uploads to Firebase Storage using the client SDKs and store metadata in Firestore.

----

## Web (admin) — local

1. Install dependencies and run:

   ```bash
   cd web
   npm install
   npm run dev
   ```

2. The admin UI is a Next.js app. Default dev host is typically `http://localhost:3000`.

----

## Mobile (Flutter)

1. Install Flutter SDK and ensure your device/emulator is available.

2. Get dependencies and run:

   ```bash
   cd mobile
   flutter pub get
   flutter run   # or use your IDE (Android Studio / VS Code)
   ```

Notes:
- The mobile app should be configured to use your Firebase project. Check `mobile/lib` for Firebase initialization code and update `google-services.json` / `GoogleService-Info.plist` as required.

----

## Firebase setup notes

1. Create a Firebase project and enable:
   - Authentication (email/password or other providers)
   - Firestore (use Native mode)
   - Storage (for images and PDFs)

2. For local development you can use the Firebase Emulator Suite (recommended) to emulate Auth, Firestore, and Storage.

3. Security:
   - Use Firebase Security Rules to protect Storage and Firestore.
   - Backend uses a service account to perform admin operations. Do not commit service account JSON to git.

----

## Common commands

- Run backend in dev: `cd backend && npm run dev`
- Run web dev: `cd web && npm run dev`
- Run mobile: `cd mobile && flutter run`

## Cleaning up tracked build files (if needed)

If you have already accidentally committed `node_modules/`, `.next/`, or other build artifacts, run from repo root:

```bash
git rm -r --cached node_modules || true
git rm -r --cached web/node_modules || true
git rm -r --cached web/.next || true
git rm -r --cached mobile/.dart_tool || true
git rm -r --cached mobile/build || true
git add .gitignore
git commit -m "chore: remove ignored build and dependency artifacts"
```

----

## Next steps and tips

- Use Firebase Emulator for local development and to test booking transactions safely.
- Consider adding CI (GitHub Actions) to run lint/tests for web and analyze for Flutter.
- Decide whether to keep `pubspec.lock` tracked (recommended for apps). If you want me to change `.gitignore` to track it, tell me.

If you want, I can also scaffold Cloud Functions (serverless) or expand backend endpoints (documents, alerts, auth helpers). Tell me which next.
