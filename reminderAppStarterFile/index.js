const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const session = require("express-session")
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");
require('dotenv').config()

app.use(express.static(path.join(__dirname, "public")));

app.use(ejsLayouts);

app.set("view engine", "ejs");

const port = process.env.PORT;
const host = process.env.HOST;


// Routes start here

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);


const passport_local = require("./middleware/passport").local_login;
const passport_github = require("./middleware/passport").github;
const authRoute = require("./routes/authRoute");
const indexRoute = require("./routes/indexRoute");
const { cp } = require("fs");
const { Store } = require("express-session");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport_local.initialize());
app.use(passport_local.session());
app.use(passport_github.initialize());
app.use(passport_github.session());





app.use((req, res, next) => {
  console.log(`User details are: `);
  console.log(req.user);

  console.log("Entire session object:");
  console.log(req.session);

  console.log(`Session details are: `);
  console.log(req.session.passport);
  next();
});

app.get("/reminders", reminderController.list);

app.get("/reminder/new", reminderController.new);

app.get("/reminder/:id", reminderController.listOne);

app.get("/reminder/:id/edit", reminderController.edit);

app.post("/reminder/", reminderController.create);


app.post("/reminder/update/:id", reminderController.update);


app.post("/reminder/delete/:id", reminderController.delete);

// Fix this to work with passport! The registration does not need to work, you can use the fake database for this.
app.use("/", indexRoute)
app.use("/auth", authRoute)


app.get("/register", authController.register);
app.post("/dashboard", authController.loginSubmit);
app.post("/admin", authController.admin)

// destroy a specfic session 
app.get("/destroy/:ID", (req, res) => {
  req.sessionStore.all((err, sessions)=>{ 
  const activeSessions = JSON.parse(JSON.stringify(sessions))
  for (sessionID in activeSessions) {
    if (req.params.ID === sessionID) {
      
      // console.log(req.session)
      // console.log(req.params.ID)
      // console.log(activeSessions)
      activeSessions[sessionID].session.destroy() // doesnt work
    }
  }
  
  })
});

app.listen(port, function () {
  console.log(
    `Server running. Visit: ${host}:${port}/auth/login in your browser 🚀`
  );
});
