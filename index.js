const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { errorHandler } = require("./helpers/errorHelper");
const Mongoose = require("./models/index");
const createError = require('http-errors');
const app = express();
app.use(cors());
app.use(logger("dev"));

// importing all required routes

const categoryRoutes = require("./routes/category");
const subCategoryRoutes = require("./routes/subCategory");
const itemRoutes = require("./routes/item");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const getApp = async () => {
	await Mongoose.connect();
	app.use("/categories", categoryRoutes);
	app.use("/subcategories", subCategoryRoutes);
	app.use("/items", itemRoutes);

	app.use(function (req, res, next) {
		next(createError(404));
	});

	// error handler
	// eslint-disable-next-line no-unused-vars
	app.use(errorHandler);

	return app;
};
module.exports = getApp;
