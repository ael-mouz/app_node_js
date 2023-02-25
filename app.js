const express = require("express");
// const mongoose = require("mongoose");
const Routes = require("./routes/routs");
require("./config/database");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", Routes);

app.listen(process.env.PORT, () => console.log(`server started on port ${process.env.PORT}`));
