const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	taxApplicability: {
		type: Boolean,
		default: undefined, // Default to parent's tax applicability
	},
	tax: {
		type: Number,
		default: 0,
	},
	items: [
		{
			type: mongoose.Schema.Types.ObjectId,
			default: [],
			ref: "Item",
		},
	],
});

module.exports = mongoose.model("SubCategory", subCategorySchema);
