var data = {
  "Cleansers": [
    {
      "name": "Tea Tree Cleanser",
      "id": 1
    },
    {
      "name": "Rose Petal Cleanser",
      "id": 2
    },
    {
      "name": "Jade Cleanser",
      "id": 3
    }
  ],
  "Creams": [
    {
      "name": "Snail Night Cream",
      "id": 1
    },
    {
      "name": "Blemish Cream",
      "id": 2
    }
  ],
}

function getCategoryNames(){
  return Object.keys(data)
}

function getProductsByCategory(category){
  return data[category]
}

function createProduct(category, product){
  var maxId = data[category].reduce(function(max, product){
    if (product.id > max){
      maxId = product.id;
    }
    return maxId;
  }, 0);

  data[category].push({name: product, id: maxId+1})
}

function deleteProduct(category, id){
  data[category] = data[category].filter(function(product){
    return product.id !== Number(id)
  })
}

function deleteCategory(category){
  delete data[category]
}

function createCategory(category){
  data[category] = [];
}

module.exports = {getCategoryNames: getCategoryNames,
                  getProductsByCategory: getProductsByCategory,
                  createProduct: createProduct,
                  deleteProduct: deleteProduct,
                  deleteCategory: deleteCategory,
                  createCategory: createCategory};
