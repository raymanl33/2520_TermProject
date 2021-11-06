let database = require("../database").Database;
let userModel = require("../database").userModel;

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database[1].reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    // console.log(reminderToFind)
    let searchResult = database[1].reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database[1].reminders });
    }
  },

  create: (req, res) => {
    console.log(database[1].reminders)
    let reminder = {
      id: database[1].reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database[1].reminders.push(reminder);
    // database[1].reminders targets Cindy Choi's database
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    console.log(reminderToFind)
    let searchResult = database[1].reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminderToFind = req.params.id
    const reminderDatbaseID = Number(reminderToFind) - 1
    let editData = {
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
    };
    console.log(database[1].reminders[reminderDatbaseID].id)
    if (Number(reminderToFind) === database[1].reminders[reminderDatbaseID].id) {
      database[1].reminders[reminderDatbaseID].title = editData.title
      database[1].reminders[reminderDatbaseID].description = editData.description
      if (editData.completed === 'false') {
        database[1].reminders[reminderDatbaseID].completed = false
      } else {
        database[1].reminders[reminderDatbaseID].completed = true
      }
    }
    console.log(database[1].reminders)
    res.redirect(`/reminder/${reminderToFind}`);
  },

  delete: (req, res) => {
    let reminderToFind = req.params.id
    const reminderDatbaseID = Number(reminderToFind) - 1
    if (Number(reminderToFind) === database[1].reminders[reminderDatbaseID].id) {
      database[1].reminders.splice(reminderDatbaseID, 1)
    }
    console.log(database)
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
