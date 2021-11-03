const { cindy } = require("../database");
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
    // implement this code
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (database.cindy.reminders.title != undefined) {
      database.cindy.reminders.replace()
    }
    if (cindy.reminders.description != undefined) {
      database.cindy.reminders.replace()
    }else {
      res.render("reminder/edit",{ reminders: database.cindy.reminders })
    }
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  delete: (req, res) => {
    // Implement this code
    let reminder = {
      id: database.cindy.reminders.length,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.pop(reminder);
    res.redirect("/reminders")
  },
};

module.exports = remindersController;
