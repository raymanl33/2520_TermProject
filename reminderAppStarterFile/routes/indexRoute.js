const { compile } = require("ejs");
const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");
const findAdmin = require("../controller/userController").isUserAdmin;
const adminDatabase = require("../database").Database
const fetch = require("node-fetch");


const unsplash_ID = process.env.UNSPLASH_ACCESS_KEY;
const endpoint = `https://api.unsplash.com/photos/random/?client_id=${unsplash_ID}`

router.get("/reminders", ensureAuthenticated, (req, res) => {
  res.render("reminders/index", {
    user: req.user.name,
  });
 
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  // Check if the database's ppi url is linking, if so generate a random 
  // photo from the UnsplashAPI
  if (req.user.ppi === '') {
    fetch(endpoint)
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        let img_url = jsonData.urls.regular
        adminDatabase[Number(req.user.id) - 1].ppi = img_url
        res.render('dashboard', {
          user: req.user.name,
          url: req.user.ppi
        });
      })      
  } else if (req.user.ppi != '') {
    res.render('dashboard', {
      user: req.user.name,
      url: req.user.ppi
    });
  }
  
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



router.get("/register", (req, res) => res.render("auth/register"));


module.exports = router;
