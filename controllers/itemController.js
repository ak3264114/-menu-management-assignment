const Category = require("../models/category");
const Item = require("../models/item");
const SubCategory = require("../models/subCategory");

exports.createItem = async (req, res) => {
	try {
		const item = new Item(req.body);
		await item.save();

		if (req.body.subCategory) {
			await SubCategory.findByIdAndUpdate(
				req.body.subCategory,
				{ $push: { items: item._id } },
				{ new: true },
			);
		}

		res.status(201).json(item);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.getItems = async (req, res) => {
	try {
		const items = await Item.find();
		res.status(200).json(items);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.getAllItemsUnderCategory = async (req, res) => {
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
			return res.status(404).json({ error: "Category not found" });
		}

		const items = category.subCategories.flatMap(
			(subCategory) => subCategory.items,
		);

		res.status(200).json(items);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.getAllItemsUnderSubCategory = async (req, res) => {
	try {
		const subCategoryId = req.params.subCategoryId;

		const subCategory = await SubCategory.findById(subCategoryId).populate(
			"items",
		);

		if (!subCategory) {
			return res.status(404).json({ error: "Sub-category not found" });
		}

		res.status(200).json(subCategory.items);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.getByAttribute = async (req, res) => {
	try {
		const { attribute, value } = req.query;

		if (!attribute || !value) {
			return res
				.status(400)
				.json({ error: "Attribute and value are required" });
		}

		const query = {};
		query[attribute] = value;

		const items = await Item.find(query);

		res.status(200).json(items);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};


exports.editItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const updatedData = req.body;

    const item = await Item.findByIdAndUpdate(itemId, updatedData, { new: true });

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




exports.searchItemByName = async (req, res) => {
  try {
    const itemName = req.query.name;

    if (!itemName) {
      return res.status(400).json({ error: 'Name query parameter is required' });
    }

    const items = await Item.find({ name: new RegExp(itemName, 'i') }); 

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};