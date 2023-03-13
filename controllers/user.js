const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const {
	generateToken,
	hashPassword,
	comparePassword,
} = require("../jwt/jwt.config");

const login = async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		if (!user) {
			return res.status(401).json({ message: "Invalid username or password" });
		}
		const isValidPassword = await comparePassword(
			req.body.password,
			user.password
		);
		if (!isValidPassword) {
			return res.status(401).json({ message: "Invalid username or password" });
		}
		const token = generateToken(user);
		const decodedToken = jwt.decode(token, { complete: true });
		const timestamp = decodedToken.payload.exp;
		const formattedTimestamp = new Date(timestamp)
		dateString = formattedTimestamp.toGMTString();
		const extendedToken = { ...decodedToken.payload, dateString };
		const newToken = jwt.sign(extendedToken, "secretKey");

		res.json({ token: newToken ,timestamp, date : formattedTimestamp });
		// res.json({ token });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Internal server error" });
	}
};

const register = async (req, res) => {
	try {
		const hashedPassword = await hashPassword(req.body.password);
		const user = new User({
			username: req.body.username,
			password: hashedPassword,
		});
		await user.save();
		res.json({ message: "User registered successfully" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Internal server error" });
	}
};

const secret = async (req, res) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const payload = await verifyToken(token);
		const user = await User.findById(payload.id);
		res.json({ message: `Welcome, ${user.username}!` });
	} catch (err) {
		console.log(err);
		res.status(401).json({ message: "Unauthorized" });
	}
};

module.exports = {
	login,
	register,
	secret,
};
