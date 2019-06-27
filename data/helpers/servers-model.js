const db = require("../dbConfig.js");

module.exports = {
  find,
  findById,
  findByRest,
  findTransactions,
  create,
  remove,
  update
};

async function find() {
  const servers = await db("servers");
  return servers;
}

async function findById(id) {
  let server = db("servers")
    .where({ id })
    .first();
  let transactionList = db("transactions")
    .select({
      id: "transactions.id",
      tipper_id: "transactions.tipper_id",
      server_id: "transactions.server_id",
      tip_paid: "transactions.tip_paid"
    })
    .where({ "transactions.server_id": id });
  const retrieval = await Promise.all([server, transactionList]);
  if (retrieval[0][0]) {
    /* This is only true if both the promise resolved AND the post exists. Checking for just the promise causes
    nonexistent posts to return an empty object and array due to my return statement returning an object by default */
    let [content] = retrieval[0];
    let servers = retrieval[1];
    return { ...content, servers };
  }
}

async function findByRest(id) {
  const servers = await db("servers")
    .where({ "servers.restaurant_id": id })
    .first();
  return servers;
}

async function findTransactions(id) {
  const transactions = await db("transactions").where({
    "transactions.server_id": id
  });
  return transactions;
}

async function create(item) {
  const [id] = await db("servers")
    .insert(item)
    .returning("id");
  if (id) {
    const server = await findById(id);
    return server;
  }
}

async function remove(id) {
  const server = await findById(id);
  if (server) {
    const deleted = await db("servers")
      .where({ id })
      .del();
    if (deleted) {
      return server;
    }
  }
}

async function update(item, id) {
  const editedServer = await db("servers")
    .where({ id })
    .update(item);
  if (editedServer) {
    const server = await findById(id);
    return server;
  }
}
