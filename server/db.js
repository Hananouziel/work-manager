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

const deleteAllMessages = async () => {
  const collectionRef = db.collection("messages");

  const querySnapshot = await collectionRef.get();

  querySnapshot.forEach(async (doc) => {
    await db.collection("messages").doc(doc.id).delete();
  });
};

// deleteAllMessages();
// testQuery();

// db.collection("users").doc("1111").set({
//   id: "1111",
//   password: "my pass",
//   name: "אלי",
//   type: "user",
// });

// db.collection("users").doc("admin").set({
//   id: "admin",
//   password: "admin",
//   name: "my name",
//   type: "admin",
// });
