const expressEjsLayouts = require("express-ejs-layouts");
let database = require("../database");

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
    // console.log(req)
    res.render("/dashboard")
  },

  registerSubmit: (req, res) => {
    // implement
  },
  admin: (req, res) => {
    res.render("/admin")
  }

};

module.exports = authController;
