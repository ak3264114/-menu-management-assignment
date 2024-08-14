const express = require('express');
const router = express.Router();
const {
  createCategory,
  getCategories,
  getCategoryById,
  editCategory,
} = require('../controllers/categoryController');


router.post('/create', createCategory);


router.get('/all', getCategories);


router.get('/categoryById/:id', getCategoryById);


router.put('/edit/:categoryId', editCategory);


module.exports = router;
