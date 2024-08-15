const express = require('express');
const router = express.Router();
const {
  createCategory,
  getCategories,
  getCategoryById,
  editCategory,
} = require('../controllers/categoryController');

const { validateCategory } = require('../validation');
const { validate } = require('express-validation');


router.post('/create', validate(validateCategory), createCategory);


router.get('/all', getCategories);


router.get('/categoryById/:id', getCategoryById);


router.put('/edit/:categoryId', editCategory);


module.exports = router;
