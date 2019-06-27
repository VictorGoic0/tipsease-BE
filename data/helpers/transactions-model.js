const db = require("../dbConfig.js");

module.exports = {
  find,
  findById,
  create,
  remove,
  update
};

async function find(id) {
  const transactions = await db("transactions");
  return transactions;
}

async function findById(id) {
  const transaction = await db("transactions")
    .where({ id })
    .first();
  return transaction;
}

async function create(item) {
  const [id] = await db("transactions")
    .insert(item)
    .returning("id");
  if (id) {
    const transaction = await findById(id);
    return transaction;
  }
}

async function remove(id) {
  const transaction = await findById(id);
  if (transaction) {
    const deleted = await db("transactions")
      .where({ id })
      .del();
    if (deleted) {
      return transaction;
    }
  }
}

async function update(item, id) {
  const editedTransaction = await db("transactions")
    .where({ id })
    .update(item);
  if (editedTransaction) {
    const transaction = await findById(id);
    return transaction;
  }
}
