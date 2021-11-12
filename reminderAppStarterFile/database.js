let Database = [
    {
      id: 1,
      name: "Jimmy Smith",
      role: 'user',
      email: "jimmy123@gmail.com",
      password: "jimmy123!", 
      reminders: [{id: 1, title: "Web Term Project", description: "Deliverable 1 due next week", completed: false},
      {id: 2, title: "test", description: "testtest", completed: false}]
    },
    {
      id: 2,
      name: "Cindy Choi",
      role: 'user',
      email: "cindy123@gmail.com",
      password: "cindy123!",
      reminders: [{id: 1, title: "Networking Term Project", description: "Milestone3 due next week", completed: false},
      {id: 2, title: "test", description: "testtest", completed: false}]
    },
    {
      id: 3,
      name: "Raymond Lee",
      role: 'admin',
      email: 'raymanl33@icloud.com',
      password: "raymond123",
      reminders: [{}]
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
        name: '',
        role: 'user',
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
    findByUser: (username) => {
      const user = Database.find((user) => user.name === username);
      if (user) {
        return user;
      }
      let DatabaseID = Database.length + 1
      Database.push({
        id: DatabaseID,
        name: username,
        role: 'user',
        email: 'Login with Github',
        password: 'Login with Github',
        reminders: [{}]
      })
      return Database[DatabaseID - 1]
    }
  };

  
  
  module.exports = { Database, userModel };
  

