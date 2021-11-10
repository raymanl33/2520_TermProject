let database = require("../database").Database;
let userModel = require("../database").userModel;

let remindersController = {
  list: (req, res) => {
    console.log(req.user.id)
    const userData = Number(req.user.id) - 1
    res.render("reminder/index", { reminders: database[userData].reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    console.log(reminderToFind)
    const userData = Number(req.user.id) - 1
    let searchResult = database[userData].reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database[userData].reminders });
    }
  },

  create: (req, res) => {
    const userData = Number(req.user.id) - 1
    if (userData < 0) {
      userData = 0
    }
    console.log(database[userData].reminders)
    let reminder = {
      id: database[userData].reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database[userData].reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    const userData = Number(req.user.id) - 1
    let searchResult = database[userData].reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminderToFind = req.params.id
    const userData = Number(req.user.id) - 1
    const reminderDatbaseID = Number(reminderToFind) - 1
    let editData = {
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
    };
    console.log(database[userData].reminders[reminderDatbaseID].id)
    if (Number(reminderToFind) === database[userData].reminders[reminderDatbaseID].id) {
      database[userData].reminders[reminderDatbaseID].title = editData.title
      database[userData].reminders[reminderDatbaseID].description = editData.description
      if (editData.completed === 'false') {
        database[userData].reminders[reminderDatbaseID].completed = false
      } else {
        database[userData].reminders[reminderDatbaseID].completed = true
      }
    }
    console.log(database[userData].reminders)
    res.redirect(`/reminder/${reminderToFind}`);
  },

  delete: (req, res) => {
    const userData = Number(req.user.id) - 1
    let reminderToFind = req.params.id
    const reminderDatbaseID = Number(reminderToFind) - 1
    console.log(reminderDatbaseID)
    if (Number(reminderToFind) === database[userData].reminders[reminderDatbaseID].id) {
      database[userData].reminders.splice(reminderDatbaseID, 1)
    }
    console.log(database)
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
