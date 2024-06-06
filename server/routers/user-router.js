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

module.exports = { userRouter };
