const router = require("express").Router();

const db = require("../data/helpers/servers-model.js");

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const review = await db.findById(id);
    if (review) {
      res.status(200).json(review);
    } else {
      res
        .status(404)
        .json({ message: "Server with specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ message: `Server request failed ${error}.` });
  }
});

router.get("/:id/transactions", async (req, res) => {
  const { id } = req.params;
  try {
    const transactions = await db.findTransactions(id);
    if (transactions) {
      res.status(200).json(transactions);
    } else {
      res
        .status(404)
        .json({ message: "Server with specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ message: `Server request failed ${error}.` });
  }
});

router.post("/", async (req, res) => {
  const { name, email, pasword, restaurant_id } = req.body;
  if (!name || !email || !pasword || !restaurant_id) {
    res.status(401).json({ message: "Please enter valid credentials" });
  } else {
    try {
      const newServer = await db.create(req.body);
      if (newServer) {
        res.status(201).json(newServer);
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: `Your server could not be created ${error}.` });
    }
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const server = await db.remove(id);
    if (server) {
      res.status(200).json(server);
    } else {
      res
        .status(404)
        .json({ message: "The server with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({
      message: `The server's information could not be modified: ${error}.`
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const review = req.body;
  try {
    const editedServer = await db.update(review, id);
    if (editedServer) {
      res.status(200).json(editedServer);
    } else {
      res.status(404).json({
        message: "The server with the specified ID does not exist."
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `The server's information could not be modified: ${error}.`
    });
  }
});

module.exports = router;
