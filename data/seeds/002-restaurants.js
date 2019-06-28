const fs = require("fs");
const faker = require("faker");
const fakeRestaurants = require("../dummyData/fakeRestauraunts")["restaurants"];

// const createFakeRestaurant = () => ({
//   location: "New York, New York",
//   name: faker.company.companyName(),
//   description: faker.lorem.paragraph(),
//   image_url: faker.image.business(),
//   rating: Math.ceil(Math.random() * 5)
// }); //used this to create fake restaurants file in dummyData

exports.seed = function(knex, Promise) {
  // const fakeRestaurants = [];

  // for (let i = 1; i <= 30; i++) {
  //   const fakeRestaurant = createFakeRestaurant();
  //   fakeRestaurants.push(fakeRestaurant);
  // }

  // fs.writeFileSync(
  //   "./data/dummyData/fakeRestauraunts.json",
  //   JSON.stringify({ restaurants: fakeRestaurants })
  // ); //used this to create fake restauraunts array

  return knex("restaurants").insert(fakeRestaurants);
};
