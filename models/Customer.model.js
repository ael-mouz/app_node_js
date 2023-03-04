const mongoose = require("mongoose");

// const myDataSchema = new mongoose.Schema({
// 	name: String,
// 	age: Number,
// 	email: String,
// });

const AddressSchema = mongoose.Schema({
	city: {
		type : String,
		validate : /[a-z]/,
		lowercase : true
	},
	street: String,
	houseNumber: {
		type :Number,
		min: 0,
		max : 500
	}
});

const ContactInfoSchema = mongoose.Schema({
	tel: [Number],
	email: [String],
	address: {
		type: AddressSchema,
		required: true,
	},
});

const CustomerSchema = mongoose.Schema({
	firstName: String,
	lastName: String,
	company: String,
	connectInfo: ContactInfoSchema,
});
const Customer = mongoose.model("Costomer", CustomerSchema);
module.exports = Customer;
