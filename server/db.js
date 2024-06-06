const fbAdmin = require("firebase-admin");
const { initializeApp } = require("firebase-admin/app");
const serviceAccount = require("./service-account.json");

const firebaseApp = initializeApp({
  credential: fbAdmin.credential.cert(serviceAccount),
  databaseURL: "https://kanban-board-bfd91.firebaseio.com",
});
const db = fbAdmin.firestore();

module.exports = { db };

const testQuery = async () => {
  try {
    const collectionRef = db.collection("shifts");

    const querySnapshot = await collectionRef.get();
    console.log("querySnapshot", querySnapshot.docs.length);

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// db.collection("users").doc("123").set({
//   id: "123",
//   password: "my pass",
//   name: "my name",
// });
db.collection("users").doc("admin").set({
  id: "admin",
  password: "admin",
  name: "my name",
  type: "admin",
});

// testQuery();
