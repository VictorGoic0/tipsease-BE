const db = require("../dbConfig.js");

module.exports = {
  find,
  findById,
  findByRest,
  create,
  remove,
  update
};

async function find() {
  const servers = await db("servers");
  return servers;
}

async function findById(id) {
  const server = db("servers")
    .where({ id })
    .first();
  return server;
}

async function findById(id) {
  const servers = db("servers")
    .where({ "servers.restaurant_id": id })
    .first();
  return servers;
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
