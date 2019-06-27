const db = require("../dbConfig.js");

module.exports = {
  find,
  findById,
  findByUser,
  create,
  remove,
  update
};

async function find() {
  const users = await db("users");
  return users;
}

async function findById(id) {
  let user = db("users")
    .where({ email })
    .first();
  let transactionList = db("transactions")
    .select({
      id: "transactions.id",
      tipper_id: "transactions.tipper_id",
      server_id: "transactions.server_id",
      tip_paid: "transactions.tip_paid",
      created_at: "transactions.created_at"
    })
    .where({ "transactions.tipper_id": id });
  const retrieval = await Promise.all([user, transactionList]);
  if (retrieval[0]) {
    /* This is only true if both the promise resolved AND the post exists. Checking for just the promise causes
    nonexistent posts to return an empty object and array due to my return statement returning an object by default */
    let content = retrieval[0];
    let transactions = retrieval[1];
    return { ...content, transactions };
  }
  return user;
}

async function findByUser(email) {
  const user = await db("users")
    .where({ email })
    .first();
  return user;
}

async function create(item) {
  const [id] = await db("users")
    .insert(item)
    .returning("id");
  if (id) {
    const user = await findById(id);
    return user;
  }
}

async function remove(id) {
  const user = await findById(id);
  if (user) {
    const deleted = await db("users")
      .where({ id })
      .del();
    if (deleted) {
      return user;
    }
  }
}

async function update(item, id) {
  const editedUser = await db("users")
    .where({ id })
    .update(item);
  if (editedUser) {
    const user = await findById(id);
    return user;
  }
}
