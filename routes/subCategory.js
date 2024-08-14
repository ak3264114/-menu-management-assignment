const express = require('express');
const router = express.Router();
const {
  createSubCategory,
  getSubCategories,
  getSubCategoryByAttribute,
  getAllSubCategoryUnderCategory,
  editSubCategory
} = require('../controllers/subCategoryController');

router.post('/create', createSubCategory);

router.get('/all', getSubCategories);

router.get('/getByAttribute', getSubCategoryByAttribute);

router.get('/getAllSubCategoryUnderCategory/:categoryId', getAllSubCategoryUnderCategory);


router.put('/edit/:subCategoryId', editSubCategory);


module.exports = router;
