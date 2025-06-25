const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Serve public/ as static folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/firebase-config', (req, res) => {
  res.json({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  });
});

// Route for "/"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
