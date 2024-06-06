const { Router } = require("express");
const { db } = require("../db");

const userRouter = Router();

userRouter.post("/", async (req, res) => {
  const { fullName, id, password, role } = req.body;

  const userRef = db.collection("users").doc(id);
  const userDoc = await userRef.get();

  if (userDoc.exists) {
    return res.status(409).json({ message: "User already exists" });
  }

  await userRef.set({
    name: fullName,
    id,
    password,
    type: role,
  });

  res.json({ message: "User created" });
});

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

userRouter.get("/attendance", async (req, res) => {
  // get all users attendance
  // const users = await db.collection("users").where("type", "!=", "admin").get();

  // get all users except the admin
  const users = await db.collection("users").where("type", "==", "user").get();

  const attendance = [];

  users.forEach((user) => {
    const userData = user.data();
    attendance.push({
      id: user.id,
      name: userData.name,
      attendance: userData.attendance ?? [],
    });
  });

  res.json({ attendance });
});

userRouter.delete("/attendance/:userId", async (req, res) => {
  const userId = req.params.userId;
  const { timestamp1, timestamp2 } = req.body;
  console.log("timestamp2", timestamp2);
  console.log("timestamp1", timestamp1);
  console.log("userId", userId);

  const userRef = db.collection("users").doc(userId);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    return res.status(404).json({ message: "User not found" });
  }

  const updatedAttendance = userDoc
    .data()
    .attendance.filter(
      (report) =>
        report.date._seconds !== timestamp1 &&
        report.date._seconds !== timestamp2
    );
  await userRef.update({ attendance: updatedAttendance });

  res.json({ message: "Attendance deleted" });
});

userRouter.get("/", async (req, res) => {
  const users = await db.collection("users").get();
  const usersData = [];

  users.forEach((user) => {
    usersData.push(user.data());
  });

  res.json({ users: usersData });
});

module.exports = { userRouter };
