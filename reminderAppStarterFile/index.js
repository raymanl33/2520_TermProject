const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const session = require("express-session")
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");
const database = require("./database").Database;

const morgan = require("morgan");
const multer = require("multer");
const imgur = require("imgur");
const cors = require("cors");
const fs = require("fs");
require('dotenv').config()

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});

app.use(express.static(path.join(__dirname, "public")));
app.use(ejsLayouts);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.use(express.json({ extended: false }));

app.use(upload.any());



// app.post("/uploads/", async (req, res) => {
//   const file = req.files[0];
//   try {
//     const url = await imgur.uploadFile(`./uploads/${file.filename}`);
//     console.log(url.link)
//     database[0].ppi = url.link
//     console.log(app.locals.user)
//     console.log(database[0])
//     res.json({ message: url.link });
//     fs.unlinkSync(`./uploads/${file.filename}`);
   
//   } catch (error) {
//     console.log("error", error);
//   }
// });


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

app.use(passport_local.initialize());
app.use(passport_local.session());
app.use(passport_github.initialize());
app.use(passport_github.session());





app.use((req, res, next) => {
  console.log(`User details are: `);
  console.log(req.user);
  app.locals.user = req.user

  console.log("Entire session object:");
  console.log(req.session);

  console.log(`Session details are: `);
  console.log(req.session.passport);
  next();
});


app.post("/uploads/", async (req, res) => {
  const file = req.files[0];
  try {
    const url = await imgur.uploadFile(`./uploads/${file.filename}`);
    console.log(url.link)
    database[Number(app.locals.user.id - 1)].ppi = url.link
    res.json({ message: url.link });
    fs.unlinkSync(`./uploads/${file.filename}`);
   
  } catch (error) {
    console.log("error", error);
  }
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
app.get("/dashboard", authController.loginSubmit)
app.post("/admin", authController.admin)


// destroy a specfic session 
app.get("/destroy/:ID", (req, res) => {
  req.sessionStore.destroy(req.params.ID)
  res.redirect('/admin')
});

app.listen(port, function () {
  console.log(
    `Server running. Visit: ${host}:${port}/auth/login in your browser 🚀`
  );
});