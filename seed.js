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

// Adding quiz data
async function seedQuizzes() {
  const quizzes = [
    {
      question: "What type of injury is most likely when using a penknife to open boxes?",
      options: ["Head injury", "Cuts and abrasions", "Eye strain", "Heat exhaustion"],
      correctAnswer: "Cuts and abrasions",
      timestamp: admin.firestore.Timestamp.now()
    },
    {
      question: "You are charging an automated forklift near flammable materials. What should have been done differently?",
      options: ["Use a long extension wire", "Charge it anywhere is okay", "Set up a designated charging area 5m away from flammables", "Turn off the lights in the area"],
      correctAnswer: "Set up a designated charging area 5m away from flammables",
      timestamp: admin.firestore.Timestamp.now()
    },
    {
      question: "When stacking boxes, what is the recommended safe maximum height?",
      options: ["2.0 meters", "1.8 meters", "1.6 meters", "1.2 meters"],
      correctAnswer: "1.6 meters",
      timestamp: admin.firestore.Timestamp.now()
    },
    {
      question: "Which of the following is NOT a suggested control for storing items in non-floor-marked zones?",
      options: ["Installing low barriers", "Adding signage", "Ignoring box placement", "Limiting box quantity"],
      correctAnswer: "Ignoring box placement",
      timestamp: admin.firestore.Timestamp.now()
    },
    {
      question: "What should be done if a damaged electrical wire is found in the workplace?",
      options: ["Tape it", "Ignore it", "Stop using it and replace it immediately", "Cover it with a rug"],
      correctAnswer: "Stop using it and replace it immediately",
      timestamp: admin.firestore.Timestamp.now()
    },
    {
      question: "You notice an employee stacking boxes above 2 meters. What is the safest immediate action?",
      options: ["Watch from a distance", "Ask them to stop and explain the 1.6m height limit", "Report after lunch", "Ignore if the stack looks stable"],
      correctAnswer: "Ask them to stop and explain the 1.6m height limit",
      timestamp: admin.firestore.Timestamp.now()
    },
    {
      question: "During a shift, you see a colleague using a penknife improperly. What should you do?",
      options: ["Record it for fun", "Let the supervisor know and suggest PPE like gloves", "Copy them to finish faster", "Offer a different penknife"],
      correctAnswer: "Let the supervisor know and suggest PPE like gloves",
      timestamp: admin.firestore.Timestamp.now()
    },
    {
      question: "If you are assigned to pack small components for the day, how can you reduce fatigue and discomfort?",
      options: ["Take no breaks", "Use magnifying tools and rotate tasks hourly", "Sit for 6 hours without moving", "Lean forward consistently"],
      correctAnswer: "Use magnifying tools and rotate tasks hourly",
      timestamp: admin.firestore.Timestamp.now()
    },
    {
      question: "A coworker plugs 4 devices into one socket. What risk are they creating?",
      options: ["Better power distribution", "Faster charging", "Overloaded socket leading to fire risk", "None, if the devices are small"],
      correctAnswer: "Overloaded socket leading to fire risk",
      timestamp: admin.firestore.Timestamp.now()
    },
    {
      question: "You observe accumulated dust in storage areas. What control measure is effective?",
      options: ["Sweep once every few months", "Install an exhaust fan only", "Use a weekly inspection checklist and mechanical ventilation", "Ignore until it becomes visible"],
      correctAnswer: "Use a weekly inspection checklist and mechanical ventilation",
      timestamp: admin.firestore.Timestamp.now()
    },
    {
      question: "Which hazard is associated with over-stacking pallets?",
      options: ["Noise pollution", "Falling objects and head injury", "Fire", "Dizziness"],
      correctAnswer: "Falling objects and head injury",
      timestamp: admin.firestore.Timestamp.now()
    },
    {
      question: "Why is floor demarcation important in both raw and finishing material zones?",
      options: ["To decorate the area", "To avoid painting the floor", "To prevent trip and fall hazards", "To create more workspace"],
      correctAnswer: "To prevent trip and fall hazards",
      timestamp: admin.firestore.Timestamp.now()
    },
    {
      question: "Which activity can lead to severe injuries if ladders are not properly used?",
      options: ["Labelling documents", "Using forklifts", "Retrieving items from elevated shelves", "Storing electrical cords"],
      correctAnswer: "Retrieving items from elevated shelves",
      timestamp: admin.firestore.Timestamp.now()
    },
    {
      question: "Why is it important to label electrical equipment areas and control plug usage?",
      options: ["For decoration", "To reduce fire and electrical hazard risk", "To save electricity", "To confuse users"],
      correctAnswer: "To reduce fire and electrical hazard risk",
      timestamp: admin.firestore.Timestamp.now()
    },
    {
      question: "Wearing gloves while handling sharp objects is optional in raw material areas.",
      options: ["True", "False"],
      correctAnswer: "False",
      timestamp: admin.firestore.Timestamp.now()
    },
    {
      question: "Maintaining proper grooming standards can help reduce the risk of hazards during packing.",
      options: ["True", "False"],
      correctAnswer: "True",
      timestamp: admin.firestore.Timestamp.now()
    },
    {
      question: "PPE should be enforced only during inspections.",
      options: ["True", "False"],
      correctAnswer: "False",
      timestamp: admin.firestore.Timestamp.now()
    },
    {
      question: "Repetitive motion during packing may lead to shoulder discomfort.",
      options: ["True", "False"],
      correctAnswer: "True",
      timestamp: admin.firestore.Timestamp.now()
    },
    {
      question: "Using magnifying tools during small component packing reduces eye fatigue.",
      options: ["True", "False"],
      correctAnswer: "True",
      timestamp: admin.firestore.Timestamp.now()
    },
    {
      question: "Trip and fall hazards are often caused by blocked or unmarked walkways.",
      options: ["True", "False"],
      correctAnswer: "True",
      timestamp: admin.firestore.Timestamp.now()
    },
    {
      question: "Housekeeping is only required once a month to control pests and hazards.",
      options: ["True", "False"],
      correctAnswer: "False",
      timestamp: admin.firestore.Timestamp.now()
    },
  ];

  for (const quiz of quizzes) {
    try {
      await db.collection("quizzes").add({
        question: quiz.question,
        options: quiz.options,
        correctAnswer: quiz.correctAnswer,
        timestamp: quiz.timestamp
      });
      console.log(`✅ Quiz added: ${quiz.question}`);
    } catch (err) {
      console.error(`❌ Error adding quiz: ${quiz.question}`, err.message);
    }
  }
}

async function seedData() {
  await seedUsers();
  await seedQuizzes();
}

seedData();
