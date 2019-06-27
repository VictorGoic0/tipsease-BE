const router = require("express").Router();

const db = require("../data/helpers/transactions-model.js");

router.get("/", async (req, res) => {
  try {
    const transactions = await db.find();
    if (transactions) {
      res.status(200).json(transactions);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Transactions could not be found ${error}.` });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await db.findById(id);
    if (transaction) {
      res.status(200).json(transaction);
    } else {
      res
        .status(404)
        .json({ message: "Transaction with specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ message: `Server request failed ${error}.` });
  }
});

router.post("/", async (req, res) => {
  const { tipper_id, server_id, tip_paid } = req.body;
  if (!tipper_id || !server_id || !tip_paid) {
    res.status(401).json({ message: "Please complete all fields" });
  } else {
    try {
      const newTransaction = await db.create(req.body);
      if (newTransaction) {
        res.status(201).json(newTransaction);
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: `Your transaction could not be created ${error}.` });
    }
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await db.remove(id);
    if (transaction) {
      res.status(200).json(transaction);
    } else {
      res.status(404).json({
        message: "The transaction with the specified ID does not exist."
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `The transaction's information could not be modified: ${error}.`
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const transaction = req.body;
  try {
    const editedTransaction = await db.update(transaction, id);
    if (editedTransaction) {
      res.status(200).json(editedTransaction);
    } else {
      res.status(404).json({
        message: "The transaction with the specified ID does not exist."
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `The transaction's information could not be modified: ${error}.`
    });
  }
});

module.exports = router;
