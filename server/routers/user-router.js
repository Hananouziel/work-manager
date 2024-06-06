const { Router } = require("express");
const { db } = require("../db");

const userRouter = Router();

userRouter.post("/login", async (req, res) => {
  const { id, password } = req.body;
  console.log({ id, password });

  const query = db
    .collection("users")
    .where("id", "==", id)
    .where("password", "==", password);

  const querySnapshot = await query.get();
  if (querySnapshot.docs.length === 0) {
    return res.status(401).json({ message: "Invalid id or password" });
  }

  res.json({ user: querySnapshot.docs[0].data() });
});

userRouter.post("/attendance/exit", async (req, res) => {
  const { userId, note } = req.body;

  const userRef = db.collection("users").doc(userId);
  const userDoc = await userRef.get();
  if (!userDoc.exists) {
    return res.status(404).json({ message: "User not found" });
  }

  const attendance = userDoc.data().attendance || [];

  attendance.push({ type: "exit", note, date: new Date() });
  await userRef.update({ attendance });

  res.json({ message: "Attendance exit saved" });
});

userRouter.post("/attendance/enter", async (req, res) => {
  const { userId } = req.body;

  const userRef = db.collection("users").doc(userId);

  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    return res.status(404).json({ message: "User not found" });
  }

  const attendance = userDoc.data().attendance || [];

  attendance.push({ type: "enter", date: new Date() });

  await userRef.update({ attendance });

  res.json({ message: "Attendance enter saved" });
});

module.exports = { userRouter };
