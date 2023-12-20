const dbProduct = require('../models/productModel')
const addUserProduct = async ({ name, description, price, image }) => {
  try {
    if (!name) {
      throw new Error('Name is undefined or empty in the request body.');
    }
    const product = await dbProduct.create({
      name,
      description,
      price,
      image,
    });
    return {
      statusCode: 200,
      message: 'success',
      result: product,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};


const deleteProductById = async (productId) => {
  try {
    const data = await dbProduct.findByIdAndDelete(productId);
    return data;
  } catch (error) {
    throw error;
  }
};


const getAllUserProducts = async () => {
  try {
    const data = await dbProduct.find({});
    return data;
  } catch (error) {
    throw error;
  }
};


const updateUserProductById = async (productId, name, description, price, image) => {
  try {
    const updatedProduct = await dbProduct.findByIdAndUpdate(
      productId,
      {
        name,
        description,
        price,
        image,
      },
      { new: true }
    );

    return updatedProduct;
  } catch (error) {
    throw error;
  }
};




module.exports = {
    addUserProduct,
    deleteProductById,
    getAllUserProducts,
    updateUserProductById
};
