const express = require("express");
const cors = require("cors");
const { userRouter } = require("./routers/user-router");
const { shiftRouter } = require("./routers/shift-router");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/users", userRouter);
app.use("/shifts", shiftRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
