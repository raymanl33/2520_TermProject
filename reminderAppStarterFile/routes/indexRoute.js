const { compile } = require("ejs");
const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");
const findAdmin = require("../controller/userController").isUserAdmin;
const adminDatabase = require("../database").Database


router.get("/reminders", ensureAuthenticated, (req, res) => {
  res.render("reminders/index", {
    user: req.user.name,
  });
 
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user.name,
  });
});

router.get("/admin", ensureAuthenticated, findAdmin(adminDatabase), (req, res) => { 
  req.sessionStore.all((err, sessions)=>{ //sessionStore.all gets all the active sessions stored into an object
    if (err) {
      console.log(err)
    }
    const activeSessions = JSON.parse(JSON.stringify(sessions))
    for (ID in activeSessions) { // print out all the active session IDs
      console.log(activeSessions[ID])
      
    }
    res.render("admin", {
    user: req.user.name,
    sessionID: activeSessions,
  });
})
});


router.get("/register", ensureAuthenticated, (req, res) => res.render("auth/register"));


module.exports = router;
