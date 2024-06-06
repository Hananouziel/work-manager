const { Router } = require("express");
const { db } = require("../db");

const shiftRouter = Router();

shiftRouter.get("/", async (req, res) => {
  // query shifts from today onwards
  const query = db
    .collection("shifts")
    .where("date", ">=", new Date(new Date().toISOString().split("T")[0]));

  const querySnapshot = await query.get();

  const shifts = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });

  res.json({ shifts });
});

shiftRouter.get("/:userId", async (req, res) => {
  const userId = req.params.userId;

  // query shifts from today onwards
  const query = db
    .collection("shifts")
    .where("userId", "==", userId)
    .where("date", ">=", new Date(new Date().toISOString().split("T")[0]));

  const querySnapshot = await query.get();

  const shifts = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });

  res.json({ shifts });
});

shiftRouter.post("/", async (req, res) => {
  const { date, shiftType, notes, userId } = req.body;
  console.log("req.body", req.body);

  db.collection("shifts").add({
    date: new Date(date),
    shiftType,
    notes,
    userId,
    status: "pending",
  });

  res.json({ message: "Shift added successfully" });
});

shiftRouter.put("/:shiftId", async (req, res) => {
  const shiftId = req.params.shiftId;

  const shiftRef = db.collection("shifts").doc(shiftId);

  await shiftRef.update({
    ...req.body,
  });

  res.json({ message: "Shift updated successfully" });
});

module.exports = { shiftRouter };
