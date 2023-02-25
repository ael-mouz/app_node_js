require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose
	.connect(process.env.MONGODB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		connectTimeoutMS: 15000,
	})
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.error(err));

module.exports = mongoose;
