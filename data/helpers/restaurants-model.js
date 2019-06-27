const db = require("../dbConfig.js");

module.exports = {
  find,
  findById,
  create,
  remove,
  update
};

async function find() {
  const restaurants = await db("restaurants");
  return restaurants;
}

async function findById(id) {
  let restaurant = db("restauraunts")
    .where({ id })
    .first();
  let serverList = db("reviews")
    .select({
      id: "servers.id",
      name: "reviews.review",
      email: "reviews.rating",
      thumbnail_url: "users.thumbnail_url"
    })
    .where({ "servers.restaurant_id": id });
  const retrieval = await Promise.all([restaurant, serverList]);
  if (retrieval[0][0]) {
    /* This is only true if both the promise resolved AND the post exists. Checking for just the promise causes
    nonexistent posts to return an empty object and array due to my return statement returning an object by default */
    let [content] = retrieval[0];
    let servers = retrieval[1];
    return { ...content, servers };
  }
}

async function create(item) {
  const [id] = await db("restaurants")
    .insert(item)
    .returning("id");
  if (id) {
    const restaurant = await findById(id);
    return restaurant;
  }
}

async function remove(id) {
  const restaurant = await findById(id);
  if (restaurant) {
    const deleted = await db("restaurants")
      .where({ id })
      .del();
    if (deleted) {
      return restaurant;
    }
  }
}

async function update(item, id) {
  const editedRestaurant = await db("restaurants")
    .where({ id })
    .update(item);
  if (editedRestaurant) {
    const restaurant = await findById(id);
    return restaurant;
  }
}
