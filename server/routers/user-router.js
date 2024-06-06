const { Router } = require("express");
const { db } = require("../db");

const userRouter = Router();

userRouter.post("/login", async (req, res) => {
  const { id, password } = req.body;
  console.log({ id, password });
  res.json({ id, password });

  const query = db
    .collection("users")
    .where("id", "==", id)
    .where("password", "==", password);

  const querySnapshot = await query.get();
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
});

module.exports = { userRouter };
