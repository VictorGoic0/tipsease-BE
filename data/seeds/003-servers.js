const fs = require("fs");
const faker = require("faker");
const fakeServers = require("../dummyData/fakeServers")["servers"];

// const generateTime = () => {
//   const randomNumber = Math.round(Math.random() * 36);
//   if (randomNumber > 12) {
//     const randomYears = Math.floor(randomNumber / 12);
//     if (randomYears > 1) {
//       return `${Math.floor(randomNumber / 12)} years`;
//     } else {
//       return `${Math.floor(randomNumber / 12)} year`;
//     }
//   } else {
//     if (randomNumber > 1) {
//       return `${randomNumber} months`;
//     } else {
//       return `${randomNumber} month`;
//     }
//   }
// };

// const createFakeServer = () => ({
//   name: `${faker.name.firstName()} ${faker.name.lastName()}`,
//   email: faker.internet.email(),
//   password: faker.internet.password(),
//   thumbnail_url: faker.image.people(),
//   restaurant_id: Math.ceil(Math.random() * 30),
//   job_title: faker.name.jobTitle(),
//   time_worked: generateTime(),
//   rating: Math.ceil(Math.random() * 5)
// }); //used this to create fake servers file in dummyData

exports.seed = function(knex, Promise) {
  // const fakeServers = [];

  // for (let i = 1; i <= 90; i++) {
  //   const fakeServer = createFakeServer();
  //   fakeServers.push(fakeServer);
  // }

  // fs.writeFileSync(
  //   "./data/dummyData/fakeServers.json",
  //   JSON.stringify({ servers: fakeServers })
  // ); //used this to create fake servers array

  return knex("servers").insert(fakeServers);
};
