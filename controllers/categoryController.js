const { CustomError } = require("../helpers/errorHelper");
const Category = require("../models/category");

exports.createCategory = async (req, res, next) => {
	console.log(req.body);
	try {
		const category = new Category(req.body);
		await category.save();
		res.status(201).json(category);
	} catch (error) {
		next(error);
	}
};

exports.getCategories = async (req, res, next) => {
	try {
		const categories = await Category.find().populate({
			path: "subCategories",
			populate: {
				path: "items",
				model: "Item",
			},
		});
		res.status(200).json(categories);
	} catch (error) {
		next(error);
	}
};

// Get a category by ID
exports.getCategoryById = async (req, res, next) => {
	try {
		const category = await Category.findById(req.params.id).populate({
			path: "subCategories",
			populate: {
				path: "items",
				model: "Item",
			},
		});
		if (!category) throw new CustomError("Category not found", 404);
		res.status(200).json(category);
	} catch (error) {
		next(error);
	}
};

exports.editCategory = async (req, res, next) => {
	try {
		const categoryId = req.params.categoryId;
		const updatedData = req.body;

		const category = await Category.findByIdAndUpdate(categoryId, updatedData, {
			new: true,
		});

		if (!category) {
			throw new CustomError("Category not found", 404);
		}

		res.status(200).json(category);
	} catch (error) {
		next(error);
	}
};
