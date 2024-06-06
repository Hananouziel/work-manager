const { Router } = require("express");
const { db } = require("../db");

const messageRouter = Router();

messageRouter.post("/", async (req, res) => {
  db.collection("messages").add({
    ...req.body,
    date: new Date(),
  });

  res.json({ message: "Message added successfully" });
});

messageRouter.get("/", async (req, res) => {
  const messages = [];
  const querySnapshot = await db.collection("messages").get();
  const users = await db.collection("users").get();
  const usersData = [];

  users.forEach((user) => {
    usersData.push(user.data());
  });

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (!data.recipient) {
      messages.push({
        id: doc.id,
        ...data,
        senderName: usersData.find((user) => user.id === doc.data().userId)
          .name,
      });
    }
  });

  res.json({ messages });
});

messageRouter.get("/:userId", async (req, res) => {
  const messages = [];
  // get messages where recipient equals userId or "all"
  const querySnapshot = await db
    .collection("messages")
    .where("recipient", "in", [req.params.userId, "all"])
    .get();

  const users = await db.collection("users").get();
  const usersData = [];

  users.forEach((user) => {
    usersData.push(user.data());
  });

  querySnapshot.forEach((doc) => {
    messages.push({
      id: doc.id,
      ...doc.data(),
      senderName: usersData.find((user) => user.id === doc.data().userId).name,
    });
  });

  res.json({ messages });
});

module.exports = { messageRouter };
