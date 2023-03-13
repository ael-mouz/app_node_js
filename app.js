const express = require("express");
// const mongoose = require("mongoose");
const Routes = require("./routes/routs");
const Routes_user = require("./routes/user.routs");
const db = require("./config/database");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
db.connect();

app.use("/", Routes);
app.use("/", Routes_user);

app.listen(process.env.PORT, () => console.log(`server started on port ${process.env.PORT}`));
