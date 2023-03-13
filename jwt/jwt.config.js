const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const secretKey = "secretKey";

function generateToken(user) {
	return jwt.sign({ id: user._id , username : user.username}, secretKey, { expiresIn: "2h" });
}

function verifyToken(token) {
	return new Promise((resolve, reject) => {
		jwt.verify(token, secretKey, (err, payload) => {
			if (err) {
				return reject(err);
			}
			resolve(payload);
		});
	});
}

function hashPassword(password) {
	return bcrypt.hash(password, 10);
}

function comparePassword(password, hash) {
	return bcrypt.compare(password, hash);
}

module.exports = { generateToken, verifyToken, hashPassword, comparePassword };
