let Database = [
    {
      id: 1,
      name: "Jimmy Smith",
      email: "jimmy123@gmail.com",
      password: "jimmy123!", 
      reminders: [{id: 1, title: "Web Term Project", description: "Deliverable 1 due next week", completed: false},
      {id: 2, title: "test", description: "testtest", completed: false}]
    },
    {
      id: 2,
      name: "Cindy Choi",
      email: "cindy123@gmail.com",
      password: "cindy123!",
      reminders: [{id: 1, title: "Networking Term Project", description: "Milestone3 due next week", completed: false},
      {id: 2, title: "test", description: "testtest", completed: false}]
    }
  ];
  
  const userModel = {
    findOne: (email, password) => {
      let DatabaseID = Database.length + 1
      const user = Database.find((user) => user.email === email);
      if (user) {
        return user;
      }
      Database.push({
        id: DatabaseID,
        name: email,
        email: email,
        password: password,
        reminders: [{}]
      })
      console.log(Database)

      return email
      // throw new Error(`Couldn't find user with email: ${email}`);
    },
    findById: (id) => {
      const user = Database.find((user) => user.id === id);
      if (user) {
        return user;
      }
      throw new Error(`Couldn't find user with id: ${id}`);
    },
  };
  
  module.exports = { Database, userModel };
  

// module.exports = Database;