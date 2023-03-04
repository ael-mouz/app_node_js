require("dotenv").config();
exports.connect = () => {
	const mongoose = require("mongoose");
	mongoose.set('strictQuery', false);
	mongoose
	  .connect(process.env.MONGODB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		connectTimeoutMS: 15000,
	  })
	  .then(() => {
		mongoose.set("strictQuery", false);
		console.log("MongoDB connected");
	  })
	  .catch((err) => console.error(err));
  };
