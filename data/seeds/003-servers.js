const fs = require("fs");
const faker = require("faker");
// const fakeServers = require("../dummyData/fakeServers")["servers"];

const createFakeServer = () => ({
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  email: faker.internet.email(),
  password: faker.internet.password(),
  restaurant_id: Math.ceil(Math.random() * 30)
}); //used this to create fake servers file in dummyData

exports.seed = function(knex, Promise) {
  const fakeServers = [];

  for (let i = 1; i <= 90; i++) {
    const fakeServer = createFakeServer();
    fakeServers.push(fakeServer);
  }

  fs.writeFileSync(
    "./data/dummyData/fakeServers.json",
    JSON.stringify({ servers: fakeServers })
  ); //used this to create fake servers array

  return knex("servers").insert([{}]);
};
