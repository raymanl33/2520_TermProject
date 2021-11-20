const express = require("express");
const passport = require("../middleware/passport").local_login;
const passport_github = require("../middleware/passport").github;
const { forwardAuthenticated, ensureAuthenticated } = require("../middleware/checkAuth");
require('dotenv').config()
const fetch = require("node-fetch");
const database = require("../database").Database;


const unsplash_ID = process.env.UNSPLASH_ACCESS_KEY;
const endpoint = `https://api.unsplash.com/photos/random/?client_id=${unsplash_ID}`
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
    // Check if the database's ppi url is linking, if so generate a random 
    // photo from the UnsplashAPI
    if (req.user.ppi === '') {
      fetch(endpoint)
        .then(function (response) {
          return response.json();
        })
        .then(function (jsonData) {
          let img_url = jsonData.urls.regular
          database[Number(req.user.id) - 1].ppi = img_url
          res.render('dashboard', {
            user: req.user.name,
            url: req.user.ppi
          });
        })      
    }
 
  });


router.post("/register",
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
