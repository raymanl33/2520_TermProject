const express = require("express");
const passport = require("../middleware/passport").local_login;
const passport_github = require("../middleware/passport").github;
const { forwardAuthenticated, ensureAuthenticated } = require("../middleware/checkAuth");

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => res.render("auth/login"));

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/auth/login",
  })
);


router.get('/auth/github',
  passport_github.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github/callback', 
  passport_github.authenticate('github', { failureRedirect: '/auth/login' }),
  function(req, res) {
    console.log(req.user.name)
    // Successful authentication, redirect to dashboard.
    res.render('dashboard', {
      user: req.user.name
    });
  });













router.post(
  "/register",
  passport.authenticate("local", {
    successRedirect: "/auth/login",
    failureRedirect: "/auth/register",
  })
)

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

module.exports = router;
