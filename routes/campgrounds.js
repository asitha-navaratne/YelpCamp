const express = require("express");
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync");

const campgrounds = require("../controllers/campgrounds");

const { isLoggedIn, validateCampground, isAuthor } = require("../middleware");

router.get("/", catchAsync(campgrounds.index));
router.get("/new", isLoggedIn, campgrounds.new);
router.post(
  "/",
  isLoggedIn,
  validateCampground,
  catchAsync(campgrounds.create)
);
router.get("/:id", catchAsync(campgrounds.show));
router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.edit));
router.put(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  validateCampground,
  catchAsync(campgrounds.update)
);
router.delete("/:id", isLoggedIn, isAuthor, catchAsync(campgrounds.delete));

module.exports = router;
