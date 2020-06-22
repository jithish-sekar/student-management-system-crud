//third party module
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

//middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
// app.use(express.bodyParser());

//router
const infoRouter = require("./router");
app.use("/info", infoRouter);

//listen port
app.listen(5000, () => {
  console.log("server started");
});

//db connection
mongoose.connect(
  "mongodb://127.0.0.1:27017/studentsdb",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log("db connected successfully");
    }
  }
);
