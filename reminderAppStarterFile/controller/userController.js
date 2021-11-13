const userModel = require("../database").userModel;
const database = require("../database").Database;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email, password);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

const getUserByUser = (username) => {
  let user = userModel.findByUser(username)
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  return user.password === password;
}

const isUserAdmin = (role) => { // this function checks if the person has a role of admin
  return (req, res, next) => {
    for (data in role) {
      if (req.user.name === role[data].name){
        
        if (req.user.role === 'admin') {
          next()
        }
      }
  
    }
    // res.status(401)
    // return res.send('Your are not an admin')
  } 
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  getUserByUser,
  isUserAdmin
};
