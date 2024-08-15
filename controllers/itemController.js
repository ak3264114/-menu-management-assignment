const { CustomError } = require("../helpers/errorHelper");
const Category = require("../models/category");
const Item = require("../models/item");
const SubCategory = require("../models/subCategory");

exports.createItem = async (req, res, next) => {
	try {
		let data = req.body;
		if (data.discount) {
			data.totalAmount = data.baseAmount - data.discount;
		} else {
			data.totalAmount = data.baseAmount;
		}
		const item = new Item(data);
		await item.save();

		if (req.body.subCategory) {
			await SubCategory.findByIdAndUpdate(
				req.body.subCategory,
				{ $push: { items: item._id } },
				{ new: true },
			);
		}

		res.status(201).json({ error: false, data: item });
	} catch (error) {
		next(error);
	}
};

exports.getItems = async (req, res, next) => {
	try {
		const items = await Item.find();
		if (!items) {
			throw new CustomError("Item not found", 404);
		}
		res.status(200).json({ error: false, data: items });
	} catch (error) {
		next(error);
	}
};

exports.getAllItemsUnderCategory = async (req, res, next) => {
	try {
		const categoryId = req.params.categoryId;
		const category = await Category.findById(categoryId).populate({
			path: "subCategories",
			populate: {
				path: "items",
				model: "Item",
			},
		});

		if (!category) {
			throw new CustomError("Category not found", 404);
		}

		const items = category.subCategories.flatMap(
			(subCategory) => subCategory.items,
		);

		if (!items) {
			throw new CustomError("Items not found", 404);
		}

		res.status(200).json({ error: false, data: items });
	} catch (error) {
		next(error);
	}
};

exports.getAllItemsUnderSubCategory = async (req, res, next) => {
	try {
		const subCategoryId = req.params.subCategoryId;

		const subCategory = await SubCategory.findById(subCategoryId).populate(
			"items",
		);

		if (!subCategory) {
			throw new CustomError("Sub-category not found", 404);
		}

		if (!subCategory.items) {
			throw new CustomError("Item not found in the provided sub category", 404);
		}

		res.status(200).json({ error: false, data: subCategory.items });
	} catch (error) {
		next(error);
	}
};

exports.getByAttribute = async (req, res, next) => {
	try {
		const { attribute, value } = req.query;

		if (!attribute || !value) {
			throw new CustomError("Attribute and value are required", 400);
		}

		const query = {};
		query[attribute] = value;

		const items = await Item.find(query);

		if (!items) {
			throw new CustomError("Item not found", 404);
		}

		res.status(200).json({ error: false, data: items });
	} catch (error) {
		next(error);
	}
};

exports.editItem = async (req, res, next) => {
	try {
		const itemId = req.params.itemId;
		const updatedData = req.body;

		const item = await Item.findByIdAndUpdate(itemId, updatedData, {
			new: true,
		});

		if (!item) {
			throw new CustomError("Item not found", 404);
		}

		res.status(200).json({ error: false, data: item });
	} catch (error) {
		next(error);
	}
};

exports.searchItemByName = async (req, res, next) => {
	try {
		const itemName = req.query.name;

		if (!itemName) {
			throw new CustomError("Name query parameter is required", 400);
		}

		const items = await Item.find({ name: new RegExp(itemName, "i") });

		if (!items) {
			throw new CustomError("Item not found", 404);
		}

		res.status(200).json({ error: false, data: items });
	} catch (error) {
		next(error);
	}
};
