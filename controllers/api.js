const dbProduct = require("../models/productModel");
const userServices = require('../services/userServices')
const productServices = require('../services/productServices')
const upload = require('../helpers/uploader')
const registerUser = async (req, res) => {
  try {
    const userDetails = req.body;
    const result = await userServices.createUser(userDetails);
    return res.status(result.status_code).json(result);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
//for login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userServices.loginUser(email, password);
    return res.status(result.status_code).json(result);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
// find All user 
const findAllUser = async (req, res) => {
  try {
    const result = await userServices.getAllUsers();
    return res.status(result.status_code).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
//paginationWithFilter
const findPagUser = async (req, res) => {
try {
    const queryParams = {
      filter: req.query.filter || "",
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    };
    const result = await userServices.getUsersWithPaginationAndFilter(queryParams);
    return res.status(result.status_code).json(result);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
      status_code: 400,
    });
  }
};
//find Single User help of id
const findOneUser = async (req, res) => {
 try {
    const userId = req.params.id;
    const result = await userServices.getUserById(userId);
    return res.status(result.status_code).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message, status_code: 500 });
  }
};

//delete user usign id 
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await userServices.deleteUserById(userId);
    return res.status(result.status_code).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message, status_code: 500 });
  }
};

//update user by using id
const updateUserOrAdmin = async (req, res) => {
  try {
    const userId = req.params.id;
    const newData = req.body;
    const result = await userServices.updateUserDataById(userId, newData);
    return res.status(result.status_code).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message, status_code: 500 });
  }
};
//crud product 
const addProduct = async (req, res) => {
  try {
    const uploadedImage = await new Promise((resolve, reject) => {
      upload(req, res, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(req.file ? req.file.filename : null);
        }
      });
    });

    const { name, description, price } = req.body;

    const result = await productServices.addUserProduct({
      name,
      description,
      price,
      image: uploadedImage,
    });

    return res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  // try {
  //   const id = req.params.id;
  //   const data = await dbProduct.findByIdAndDelete(id);
  //   res.status(200).json({
  //     message: `Product ${data.name} has been deleted..`,
  //   });
  // } catch (error) {
  //   res.status(400).json({ message: error.message });
  // }
  try {
    const id = req.params.id;
    const data = await productServices.deleteProductById(id);

    if (data) {
      res.status(200).json({
        message: `Product ${data.name} has been deleted.`,
      });
    } else {
      res.status(404).json({
        message: `Product with ID ${id} not found.`,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const ReadAllProduct = async (req, res) => {

  try {
    const data = await productServices.getAllUserProducts();

    res.status(200).json({
      message: "All Product list",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const UpdateAllProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const uploadedImage = await new Promise((resolve, reject) => {
      upload(req, res, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(req.file ? req.file.filename : null);
        }
      });
    });

    const { name, description, price } = req.body;

    if (!name) {
      throw new Error('Name is undefined or empty in the request body.');
    }
    const updatedProduct = await productServices.updateUserProductById(
      productId,
      name,
      description,
      price,
      uploadedImage
    );
    return res.status(200).json({
      statusCode: 200,
      message: 'success',
      result: updatedProduct,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

const socialLogin = async (req, res) => {
 try {
    const { google_id, apple_id, facebook_id, email } = req.body;
    const result = await userServices.socialMediaLogin({ google_id, apple_id, facebook_id, email });
    return res.status(result.status_code).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      status_code: 400,
    });
  }
};

module.exports = {
  registerUser,
  login,
  findAllUser,
  findOneUser,
  findPagUser,
  deleteUser,
  updateUserOrAdmin,
  addProduct,
  deleteProduct,
  ReadAllProduct,
  UpdateAllProduct,
  socialLogin,
};
