const SubCategory = require("../models/subCategory");
const Category = require("../models/category");

// Create a new sub-category
exports.createSubCategory = async (req, res) => {
	try {
		const subCategory = new SubCategory(req.body);
		await subCategory.save();

		// Add sub-category to the parent category
		if (req.body.category) {
			await Category.findByIdAndUpdate(
				req.body.category,
				{ $push: { subCategories: subCategory._id } },
				{ new: true },
			);
		}

		res.status(201).json(subCategory);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Get all sub-categories
exports.getSubCategories = async (req, res) => {
	try {
		const subCategories = await SubCategory.find().populate("items");
		res.status(200).json(subCategories);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.getSubCategoryByAttribute = async (req, res) => {
	try {
		const data = req.body;

		let subCategory = await SubCategory.findOne(data).populate("items");

		res.status(200).json(subCategory);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};


exports.getAllSubCategoryUnderCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId).populate({
      path: 'subCategories',
      populate: {
        path: 'items',
        model: 'Item'
      }
    }).select("subCategories");
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.editSubCategory = async (req, res) => {
	try {
	  const subCategoryId = req.params.subCategoryId;
	  const updatedData = req.body;
  
	  const subCategory = await SubCategory.findByIdAndUpdate(subCategoryId, updatedData, { new: true });
  
	  if (!subCategory) {
		return res.status(404).json({ error: 'Sub-category not found' });
	  }
  
	  res.status(200).json(subCategory);
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
  };
