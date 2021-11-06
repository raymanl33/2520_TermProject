const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");


router.get("/reminders", ensureAuthenticated, (req, res) => {
  res.render("reminders/index", {
    user: req.user.name,
  });
 
});

// "/reminders", reminderController.list


module.exports = router;
