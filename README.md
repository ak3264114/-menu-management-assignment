# Menu Management Backend

## Deployed Link
https://menu-management-assignment.onrender.com

## Postman collection link
https://github.com/ak3264114/menu-management-assignment/blob/main/menu-management-backend.postman_collection.json


## Getting Started


### Installation

1. **Clone the repository:**

 ```bash
 git clone https://github.com/ak3264114/menu-management-assignment.git
 ```
```bash
 cd menu-management-assignment
 ```    
 ```bash
 npm install
 ```
   
 ### update env
    MONGODB_URI=ongodb+srv://menumanagement:menumanagement@cluster0.jcb3o.mongodb.net/menu-management?retryWrites=true&w=majority&appName=Cluster0
    PORT=4000

```bash
npm run dev
```

# API Routes

## Categories

- **POST /categories/create**  
  Create a new category.  
  **Validation:** `validate(validateCategory)`

- **GET /categories/all**  
  Retrieve all categories.

- **GET /categories/categoryById/:id**  
  Retrieve a specific category by ID.

- **PUT /categories/edit/:categoryId**  
  Update a category by ID.

## Subcategories

- **POST /subcategories/create**  
  Create a new subcategory.  
  **Validation:** `validate(subCategoryValidation)`

- **GET /subcategories/all**  
  Retrieve all subcategories.

- **GET /subcategories/getByAttribute**  
  Retrieve subcategories based on specified attributes.

- **GET /subcategories/getAllSubCategoryUnderCategory/:categoryId**  
  Retrieve all subcategories under a specific category by category ID.

- **PUT /subcategories/edit/:subCategoryId**  
  Update a subcategory by ID.

## Items

- **POST /items/create**  
  Create a new item.  
  **Validation:** `validate(itemValidations)`

- **GET /items/all**  
  Retrieve all items.

- **GET /items/getAllItemsUnderCategory/:categoryId**  
  Retrieve all items under a specific category by category ID.

- **GET /items/getAllItemsUnderSubCategory/:subCategoryId**  
  Retrieve all items under a specific subcategory by subcategory ID.

- **GET /items/getByAttribute**  
  Retrieve items based on specified attributes.

- **PUT /items/edit/:itemId**  
  Update an item by ID.

- **GET /items/search**  
  Search for items by name.
