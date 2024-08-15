const Joi = require("joi");

exports.validateCategory = {
	body: Joi.object({
		name: Joi.string().min(3).max(100).required(),
		image: Joi.string().uri().required(),
		description: Joi.string().min(10).required(),
		taxApplicability: Joi.boolean().default(false),
		tax: Joi.number().min(0).default(0),
		taxType: Joi.string(),
	}),
};

exports.subCategoryValidation = {
	body: Joi.object({
		name: Joi.string().min(3).max(100).required(),
		image: Joi.string().uri().required(),
		description: Joi.string().min(10).required(),
		taxApplicability: Joi.boolean(),
		tax: Joi.number().min(0).default(0),
        category : Joi.string().hex().length(24).required()
	}),
};

exports.itemValidations= {
	body: Joi.object({
		name: Joi.string().min(3).max(100).required(),
		image: Joi.string().uri().required(),
		description: Joi.string().min(10).required(),
		taxApplicability: Joi.boolean().default(false),
		tax: Joi.number().min(0).default(0),
		baseAmount: Joi.number().min(0).required(),
		discount: Joi.number().min(0).default(0),
        subCategory : Joi.string().hex().length(24)
	}),
};

