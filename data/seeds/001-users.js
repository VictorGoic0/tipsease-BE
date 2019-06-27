const fs = require("fs");
const faker = require("faker");
const bcrypt = require("bcryptjs");
// const fakeUsers = require("../dummyData/fakeUsers")["users"];

const createFakeUser = () => ({
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  email: faker.internet.email(),
  password: faker.internet.password()
}); // used this to create fake users file in dummyData

exports.seed = function(knex, Promise) {
  const fakeUsers = [];

  for (let i = 0; i < 100; i++) {
    fakeUsers.push(createFakeUser());
  }

  const Joseph = {
    name: "Joseph Garcia",
    email: "joseph@email.com",
    password: "password",
    thumbnail_url: "https://i.ibb.co/bJHx1V7/DSC0496-rs.png"
  };
  const Marlon = {
    name: "Marlon Raskin",
    email: "marlon@email.com",
    password: "password"
  };
  const Alex = {
    name: "Alex Shillingford",
    email: "alex@email.com",
    password: "password"
  };
  fakeUsers.push(Joseph);
  fakeUsers.push(Marlon);
  fakeUsers.push(Alex);
  fs.writeFileSync(
    "./data/dummyData/fakeUsers.json",
    JSON.stringify({ users: fakeUsers })
  ); //used this to create fake users file in dummyData

  fakeUsers.map(user => {
    user.password = bcrypt.hashSync(user.password, 8);
  });

  return knex("users").insert(fakeUsers);
};
