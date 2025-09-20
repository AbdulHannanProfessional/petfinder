const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const router = require("./src/routes/index.js");
const app = express();
const port = 4001;
require('dotenv').config();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use("/uploads", express.static("uploads"));
// parse json

app.use(cors("*"));
mongoose
  .connect(process.env.MONGO_URL)
  // .connect(
  //   "mongodb+srv://zubairsaylani:hGo9Cx1NLMvsamrT@cluster0.9yt3l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/MERN_APP"
  // )
  .then(() => {
    console.log("Connection with mongodb is successful");
    createAdminByDefault();
  })
  .catch((err) => console.log("err", err));

app.use(router);
app.get("/", (req, res) => {
  res.status(200).send("Hello World! Server is Running");
});

async function createAdminByDefault() {
  const User = require("./src/models/UserSchema.js");
  try {
    const adminExist = await User.findOne({ role: "admin" });

    if (!adminExist) {
      const hashPassword = await bcrypt.hash(process.env.ADMIN_PASS, 10);
      const admin = new User({
        name: "admin",
        email: "admin@admin.com",
        password: hashPassword,
        role: "admin",
      });

      await admin.save();
      console.log("admin Created Successfully");
      console.log("admin Email: zubair@gmail.com");
      console.log("admin Password: admin123");
    }
  } catch (error) {
    console.log("error", error);
  }
}

app.listen(port, () => {
  console.log(`server is listening on port: ${port}`);
});
