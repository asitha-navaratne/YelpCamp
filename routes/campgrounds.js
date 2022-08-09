const express = require("express");
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync");

const campgrounds = require("../controllers/campgrounds");

const { isLoggedIn, validateCampground, isAuthor } = require("../middleware");

const multer = require("multer");

const { storage } = require("../cloudinary");
const upload = multer({ storage });

router
  .route("/")
  .get(catchAsync(campgrounds.index))
  // .post(isLoggedIn, validateCampground, catchAsync(campgrounds.create));
  .post(upload.single("campground[image]"), (req, res) => {
    res.send(req.body, req.file);
  });

router.get("/new", isLoggedIn, campgrounds.new);

router
  .route("/:id")
  .get(catchAsync(campgrounds.show))
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.delete));

router
  .route("/:id/edit")
  .get(isLoggedIn, isAuthor, catchAsync(campgrounds.edit))
  .put(
    isLoggedIn,
    isAuthor,
    validateCampground,
    catchAsync(campgrounds.update)
  );

module.exports = router;
