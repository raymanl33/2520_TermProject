let database = require("../database");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database.cindy.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminderToFind = req.params.id
    const reminderDatbaseID = Number(reminderToFind) - 1
    console.log(reminderToFind)
    let editData = {
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
    };
    console.log(database['cindy'].reminders[reminderDatbaseID]['id'])
    if (Number(reminderToFind) === database['cindy'].reminders[reminderDatbaseID]['id']) {
      database.cindy.reminders[reminderDatbaseID].title = editData.title
      database.cindy.reminders[reminderDatbaseID].description = editData.description
      if (editData.completed === 'false') {
        database.cindy.reminders[reminderDatbaseID].completed = false
      } else {
        database.cindy.reminders[reminderDatbaseID].completed = true
      }
    }
    console.log(database.cindy.reminders)
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    // Implement this code
    res.redirect("/reminders");
  },
    
};

module.exports = remindersController;
