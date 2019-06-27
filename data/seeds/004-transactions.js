const fs = require("fs");
const faker = require("faker");
const fakeTransactions = require("../dummyData/fakeTransactions")[
  "transactions"
];

// const createFakeTransaction = () => ({
//   tip_paid: Math.random() * 100,
//   server_id: Math.ceil(Math.random() * 90),
//   tipper_id: Math.ceil(Math.random() * 100)
// }); // used this to create fake transactions file in dummyData

exports.seed = function(knex, Promise) {
  // const fakeTransactions = [];

  // for (let i = 1; i <= 90; i++) {
  //   const fakeReview = createFakeTransaction();
  //   fakeTransactions.push(fakeReview);
  // }

  // fs.writeFileSync(
  //   "./data/dummyData/fakeTransactions.json",
  //   JSON.stringify({ transactions: fakeTransactions })
  // ); //used this to create fake transactions array

  return knex("transactions").insert(fakeTransactions);
};
