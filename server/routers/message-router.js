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

module.exports = { messageRouter };
