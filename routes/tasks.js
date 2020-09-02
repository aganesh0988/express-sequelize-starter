const express = require("express");
const router = express.Router();
const db = require("../db/models");

const { Task } = db;

router.get("/", (req, res) => {
  // TODO: Fetch all tasks from the database (Read)
  // TODO: Render all tasks in JSON format
});

module.exports = router;
