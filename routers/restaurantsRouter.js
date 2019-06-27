const router = require("express").Router();

const db = require("../data/helpers/restaurants-model.js");
const Servers = require("../data/helpers/servers-model.js");

router.get("/", async (req, res) => {
  try {
    const restaurants = await db.find();
    if (restaurants) {
      res.status(200).json(restaurants);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Restaurants could not be found ${error}.` });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const restaurant = await db.findById(id);
    if (restaurant) {
      res.status(200).json(restaurant);
    } else {
      res
        .status(404)
        .json({ message: "Restaurant with specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ message: `Restaurant request failed ${error}.` });
  }
});

router.post("/", async (req, res) => {
  const { name, location, description, image_url } = req.body;
  if (!name || !location || !description || !image_url) {
    res.status(401).json({
      message: "Please do not leave any of the restaurant fields blank."
    });
  } else {
    try {
      const newRestaurant = await db.create(req.body);
      if (newRestaurant) {
        res.status(201).json(newRestaurant);
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: `Your restaurant could not be posted ${error}.` });
    }
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const restaurant = await db.remove(id);
    if (restaurant) {
      res.status(200).json(restaurant);
    } else {
      res.status(404).json({
        message: "The restaurant with the specified ID does not exist."
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `The restaurant's information could not be modified: ${error}.`
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const restaurant = req.body;
  try {
    const editedRestaurant = await db.update(restaurant, id);
    if (editedRestaurant) {
      res.status(200).json(editedRestaurant);
    } else {
      res.status(404).json({
        message: "The restaurant with the specified ID does not exist."
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `The restaurant's information could not be modified: ${error}.`
    });
  }
});

router.get("/:id/servers", async (req, res) => {
  const { id } = req.params;
  try {
    const servers = await Servers.findByRest(id);
    if (servers) {
      res.status(200).json(servers);
    }
  } catch (error) {
    res.status(500).json({ message: `Servers could not be found ${error}.` });
  }
});

module.exports = router;
