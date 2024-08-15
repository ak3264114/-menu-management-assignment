const express = require('express');
const router = express.Router();
const {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
  getByAttribute,
  getAllItemsUnderSubCategory,
  getAllItemsUnderCategory,
  editItem,
  searchItemByName
} = require('../controllers/itemController');

const { itemValidations } = require('../validation');
const { validate } = require('express-validation');


router.post('/create', validate(itemValidations), createItem);


router.get('/all', getItems);

router.get('/getAllItemsUnderCategory/:categoryId', getAllItemsUnderCategory);

router.get('/getAllItemsUnderSubCategory/:subCategoryId', getAllItemsUnderSubCategory);

router.get('/getByAttribute', getByAttribute);

router.put('/edit/:itemId', editItem);

router.get('/search', searchItemByName);



module.exports = router;
