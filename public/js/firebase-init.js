window.firebaseApp = null;
window.auth = null;
window.db = null;

async function loadFirebaseConfig() {
  try {
    const res = await fetch("http://localhost:5500/firebase-config");
    const config = await res.json();

    firebase.initializeApp(config);
    console.log("✅ Firebase initialized");

    window.firebaseApp = firebase.app();
    window.auth = firebase.auth();
    window.db = firebase.firestore();

    // Let other scripts know Firebase is ready
    document.dispatchEvent(new Event("firebaseReady"));
  } catch (err) {
    console.error("❌ Failed to load Firebase config:", err);
  }
}

loadFirebaseConfig();
