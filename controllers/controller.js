const Item = require("../models/data");
exports.getItem = async (req, res) => {
	try {
		const items = await Item.find();
		res.json(items);
	} catch (err) {
		console.error(err);
		res.status(500).send("server error");
	}
};
exports.getItemById = async (req, res) => {
	try {
		const items = await Item.findById(req.params.id);
		if (!items) {
			return res.status(404).json({ msg: "Item not found" });
		}
		res.json(items);
	} catch (err) {
		console.error(err);
		res.status(500).send("server error");
	}
};
exports.createItem = async (req, res) => {
	try {
		const newItem = new Item(req.body);
		const items = await newItem.save();
		res.json(items);
	} catch (err) {
		console.error(err);
		res.status(500).send("server error");
	}
};
exports.UpdateItem = async (req, res) => {
	try {
		const items = await Item.findById(req.params.id);
		if (!items) {
			return res.status(404).json({ msg: "Item not found" });
		}
		items.set(req.body);
		const UpdatedItem = await items.save();
		res.json(UpdatedItem);
	} catch (err) {
		console.error(err);
		res.status(500).send("server error");
	}
};
exports.deleteItem = async (req, res) => {
	try {
		const items = await Item.findById(req.params.id);
		if (!items) {
			return res.status(404).json({ msg: "Item not found" });
		}
		await items.delete();
		res.json({ msg: "Item deleted" });
	} catch (err) {
		console.error(err);
		res.status(500).send("server error");
	}
};
