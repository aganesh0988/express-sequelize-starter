const express = require("express");
const router = express.Router();
const db = require("../db/models");

const { check, validationResult } = require("express-validator");
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

const validateTask = [
  //  Task name cannot be empty:
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Task name can't be empty."),
  //  Task name cannot be longer than 255 characters:
  check("name")
    .isLength({ max: 255 })
    .withMessage("Task name can't be longer than 255 characters."),
];

const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  // If the validation errors are empty,
  if (!validationErrors.isEmpty()) {
    // Generate an array of error messages
    const errors = validationErrors.array().map((error) => error.msg);

    // Generate a new `400 Bad request.` Error object
    // and invoke the next function passing in `err`
    // to pass control to the global error handler.
    const err = Error("Bad request.");
    err.status = 400;
    err.title = "Bad request.";
    err.errors = errors;
    return next(err);
  }

  // Invoke the next middleware function
  next();
};

router.post(
  "/",
  validateTask,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const { name } = req.body;
    const task = await Task.create({ name });
    res.status(201).json({ task });
  })
);

module.exports = router;
