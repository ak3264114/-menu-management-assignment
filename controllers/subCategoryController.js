const SubCategory = require("../models/subCategory");
const Category = require("../models/category");


exports.createSubCategory = async (req, res, next) => {
	try {
		const subCategory = new SubCategory(req.body);
		await subCategory.save();

		
		if (req.body.category) {
			await Category.findByIdAndUpdate(
				req.body.category,
				{ $push: { subCategories: subCategory._id } },
				{ new: true },
			);
		}

		res.status(201).json(subCategory);
	} catch (error) {
		next(error);
	}
};


exports.getSubCategories = async (req, res, next) => {
	try {
		const subCategories = await SubCategory.find().populate("items");
		res.status(200).json(subCategories);
	} catch (error) {
		next(error);
	}
};

exports.getSubCategoryByAttribute = async (req, res, next) => {
	try {
		const data = req.body;

		let subCategory = await SubCategory.findOne(data).populate("items");

		res.status(200).json(subCategory);
	} catch (error) {
		next(error);
	}
};

exports.getAllSubCategoryUnderCategory = async (req, res, next) => {
	try {
		const category = await Category.findById(req.params.categoryId)
			.populate({
				path: "subCategories",
				populate: {
					path: "items",
					model: "Item",
				},
			})
			.select("subCategories");
		if (!category) throw new CustomError("Category not found", 404);
		res.status(200).json(category);
	} catch (error) {
		next(error);
	}
};

exports.editSubCategory = async (req, res, next) => {
	try {
		const subCategoryId = req.params.subCategoryId;
		const updatedData = req.body;

		const subCategory = await SubCategory.findByIdAndUpdate(
			subCategoryId,
			updatedData,
			{ new: true },
		);

		if (!subCategory) {
			throw new CustomError("Sub-category not found", 404);
		}

		res.status(200).json(subCategory);
	} catch (error) {
		next(error);
	}
};
