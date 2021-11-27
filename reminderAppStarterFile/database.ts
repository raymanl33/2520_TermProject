import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

let Database = [
  {
    id: 1,
    name: "Jimmy Smith",
    ppi: '',
    role: 'user',
    email: "jimmy123@gmail.com",
    password: "jimmy123!", 
    reminders: [{id: 1, title: "Web Term Project", description: "Deliverable 1 due next week", completed: false},
    {id: 2, title: "test", description: "testtest", completed: false}]
  },
  {
    id: 2,
    name: "Cindy Choi",
    ppi: '',
    role: 'user',
    email: "cindy123@gmail.com",
    password: "cindy123!",
    reminders: [{id: 1, title: "Networking Term Project", description: "Milestone3 due next week", completed: false},
    {id: 2, title: "test", description: "testtest", completed: false}]
  },
  {
    id: 3,
    name: "Bill Lee",
    ppi: '',
    role: 'admin',
    email: 'bill123@gmail.com',
    password: "bill123!",
    reminders: [{}]
  },
  {
    id: 4,
    name: "Ryan Lee",
    ppi: '',
    role: 'admin',
    email: 'ryan123@gmail.com',
    password: "ryan123!",
    reminders: [{}]
  }
];

const userModel = {
  findOne: (email: string, password: string) => {
    let DatabaseID = Database.length + 1
    const user = Database.find((user) => user.email === email);
    // const user = prisma.user.findUnique({ where: {email}});
    if (user) {
      // const users = prisma.user.findMany();
      // console.log(users)
      return user;
    } else {
      // console.log('no')
      // const createdUser = prisma.user.create({ 
      //   data: {
      //     name: '', 
      //     ppi: '',
      //     role: 'user',
      //     email: email, 
      //     password: password,
      // }
      Database.push({
        id: DatabaseID,
        name: '',
        ppi: '',
        role: 'user',
        email: email,
        password: password,
        reminders: [{}]
      })
    
    }
    
    console.log(Database)

    return email
    // throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id: number) => {
    const user = Database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
  findByUser: (username: string) => {
    const user = Database.find((user) => user.name === username);
    if (user) {
      return user;
    }
    let DatabaseID = Database.length + 1
    Database.push({
      id: DatabaseID,
      name: username,
      ppi: '',
      role: 'user',
      email: 'Login with Github',
      password: 'Login with Github',
      reminders: [{}]
    })
    return Database[DatabaseID - 1]
  }
};



module.exports = { Database, userModel };


