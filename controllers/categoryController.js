const Category = require('../models/category');


exports.createCategory = async (req, res) => {
  console.log(req.body)
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    next(error)
  }
};


exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate({
      path: 'subCategories',
      populate: {
        path: 'items',
        model: 'Item'
      }
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate({
      path: 'subCategories',
      populate: {
        path: 'items',
        model: 'Item'
      }
    });
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.editCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const updatedData = req.body;

    const category = await Category.findByIdAndUpdate(categoryId, updatedData, { new: true });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};