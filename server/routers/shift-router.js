const { Router } = require("express");
const { db } = require("../db");

const shiftRouter = Router();

const getAdminShifts = async (req, res) => {
  const group = req.params.group || "";
  // query shifts from today onwards, filter by group if provided

  const query = db
    .collection("shifts")
    .where("date", ">=", new Date(new Date().toISOString().split("T")[0]));

  const querySnapshot = await query.get();

  let shifts = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });

  if (group) {
    const usersQuery = db.collection("users").where("group", "==", group);
    const usersQuerySnapshot = await usersQuery.get();
    const userIds = usersQuerySnapshot.docs.map((doc) => doc.id);

    shifts = shifts.filter((shift) => userIds.includes(shift.userId));
  }

  console.log("shifts", shifts);
  res.json({ shifts });
};

shiftRouter.get("/admin/:group", getAdminShifts);
shiftRouter.get("/admin", getAdminShifts);

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
