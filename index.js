const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const pinRouter = require("./routes/pins");
const userRouter = require("./routes/users");

const PORT = process.env.port || 5000;
const app = express();
dotenv.config();
app.use(express.json());
//! Mongoose connection
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("you are now connected to your db");
  })
  .catch((err) => console.log(err));
//! All middleware
app.use(cors());
app.use(helmet());
//* all routes
app.use("/api/pins", pinRouter);
app.use("/api/users", userRouter);
//* App listen to port
app.listen(PORT, () => {
  console.log("hello rahmou");
});
