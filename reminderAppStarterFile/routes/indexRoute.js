const { compile } = require("ejs");
const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");


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

router.get("/admin", ensureAuthenticated, (req, res) => {
  req.sessionStore.all((err, sessions)=>{ 
    if (err) {
      console.log(err)
    }
    const activeSessions = JSON.parse(JSON.stringify(sessions))
    for (ID in activeSessions) {
      console.log(ID)
    }
    res.render("admin", {
    user: req.user.name,
    sessionID: activeSessions
  });
})
});

router.get("/register", ensureAuthenticated, (req, res) => res.render("auth/register"));


module.exports = router;
