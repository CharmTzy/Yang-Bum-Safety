const admin = require("firebase-admin");
const fs = require("fs");

const serviceAccount = require("./firebase-admin-sdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const auth = admin.auth();

async function seedUsers() {
  const users = [
    { email: "admin@example.com", password: "admin123", role: "admin" },
    { email: "employee@example.com", password: "employee123", role: "employee" },
  ];

  for (const user of users) {
    try {
      const createdUser = await auth.createUser({
        email: user.email,
        password: user.password
      });

      await db.collection("users").doc(createdUser.uid).set({
        email: user.email,
        role: user.role
      });

      console.log(`✅ Created ${user.role}: ${user.email}`);
    } catch (err) {
      console.error(`❌ Error creating ${user.email}:`, err.message);
    }
  }
}

seedUsers();