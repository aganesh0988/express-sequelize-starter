const express = require("express");
const router = express.Router();
const db = require("../db/models");

const { Task } = db;

const asyncHandler = (handler) => (req, res, next) =>
  handler(req, res, next).catch(next);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const tasks = await Task.findAll();
    res.json({ tasks });
  })
);

module.exports = router;
