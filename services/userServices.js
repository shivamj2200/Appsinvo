const db  =  require('../models/userModel');
const hashPassword = require('../helpers/bycrptPassword');
const tokenGenerator = require('../helpers/tokenGenrate');
//create services 
async function createUser(userDetails) {
  try {
    const bcryptedPassword = await hashPassword.bcryptPassword(userDetails.password);
    const user = await db.create({
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      phone: userDetails.phone,
      password: bcryptedPassword,
      userType: userDetails.userType,
      google_id: userDetails.google_id,
      apple_id : userDetails.apple_id,
      facebook_id : userDetails.facebook_id,
    });
    return {
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      status_code: 201,
      message: "User registered successfully",
    };
  } catch (error) {
    throw new Error(error.message);
  }
}


//login Services
async function loginUser(email, password) {
  try {
    const user = await db.findOne({ email });
    if (!user) {
      throw new Error("You are not a registered user");
    }
    const matchPassword = await hashPassword.compareHashPassword(password, user.password);
    if (!matchPassword) {
      throw new Error("Email/Password is wrong");
    }
    const userData = {
      id: user._id,
      type: user.userType,
    };
    const { access_token } = await tokenGenerator.generatedToken(userData);
    return {
      data: {
        firstName: user.firstName,
        access_token,
      },
      status_code: 200,
      message: "User successfully login",
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

//find All User 
async function getAllUsers() {
  try {
    const data = await db.find();
    return {
      message: "All user records",
      data,
      status_code: 200,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}
//pagination 
async function getUsersWithPaginationAndFilter(queryParams) {
  try {
    let query = db.find();
    const { filter = "", page = 1, limit = 10 } = queryParams;
    const pageSize = parseInt(limit);
    const skip = (page - 1) * pageSize;
    const total = await db.countDocuments();
    const pages = Math.ceil(total / pageSize);

    if (page > pages) {
      return {
        status: "fail",
        message: "No page found",
        status_code: 404,
      };
    }

    let result = await query.skip(skip).limit(pageSize);
    const filtered = result.filter((target) => {
      const lowerCaseFilter = filter.toLowerCase();
      return (
        !filter ||
        (target.firstName &&
          target.firstName.toLowerCase().includes(lowerCaseFilter)) ||
        (target.email &&
          target.email.toLowerCase().includes(lowerCaseFilter)) ||
        (target.phone && target.phone.toLowerCase().includes(lowerCaseFilter))
      );
    });

    return {
      status: "200",
      data: filtered,
      filter,
      count: filtered.length,
      page,
      pages,
      status_code: 200,
    };
  } catch (error) {
    // console.error(error);
    throw new Error(error.message);
  }
}

//find oneUser 
async function getUserById(userId) {
  try {
    const user = await db.findById(userId);
    if (!user) {
      return {
        status: "fail",
        message: "User not found",
        status_code: 404,
      };
    }
    return {
      status: "success",
      message: "User details found successfully",
      user,
      status_code: 200,
    };
  } catch (error) {
    // console.error(error);
    throw new Error(error.message);
  }
}

//deleteUser by id
async function deleteUserById(userId) {
  try {
    const data = await db.findByIdAndDelete(userId);
    if (!data) {
      return {
        status: "fail",
        message: `User with ID ${userId} not found`,
        status_code: 404,
      };
    }
    return {
      status: "success",
      message: `User with ${data.firstName} has been deleted`,
      status_code: 200,
    };
  } catch (error) {
    // console.error(error);
    throw new Error(error.message);
  }
}
//Update User
async function updateUserDataById(userId, newData) {
  try {
    if (!newData) {
      return {
        status: "fail",
        message: "User update can not be empty!",
        status_code: 400,
      };
    }
    const data = await db.findByIdAndUpdate(userId, newData, {
      useFindAndModify: false,
    });
    if (!data) {
      return {
        status: "fail",
        message: `Cannot update data with id=${userId}. Maybe data is not found!`,
        status_code: 404,
      };
    }

    return {
      status: "success",
      message: "User updated successfully",
      status_code: 200,
    };
  } catch (error) {
    // console.error(error);
    throw new Error(error.message);
  }
}


//Social media login
async function socialMediaLogin({google_id, apple_id, facebook_id, email}) {
  try {
    let user;
    if (google_id) {
      user = await db.findOne({ google_id });
    } else if (apple_id) {
      user = await db.findOne({ apple_id });
    } else if (facebook_id) {
      user = await db.findOne({ facebook_id });
    }
    if (user) {
      return {
        status: "success",
        message: "User logged in successfully",
        status_code: 200,
      };
    } else {
      const User = await db.create({ email, google_id, apple_id, facebook_id });
      return {
        status: "success",
        message: `${User.email} logged in successfully`,
        status_code: 201,
      };
    }
  } catch (error) {
    // console.error(error);
    throw new Error(error.message);
  }
}

module.exports = {
    createUser,
    loginUser,
    getAllUsers,
    getUsersWithPaginationAndFilter,
    getUserById,
    deleteUserById,
    updateUserDataById,
    socialMediaLogin,
}
