const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const ListingController = require("../controllers/listings.js");

// INDEX
router.get("/", wrapAsync(ListingController.index));

// NEW
router.get("/new", isLoggedIn, ListingController.renderNewForm);

// SHOW  ⭐ ALWAYS LAST
router.get("/:id", wrapAsync(ListingController.showListing));

// CREATE
router.post("/new", isLoggedIn, validateListing, wrapAsync(ListingController.createListing));

// EDIT  ⭐ MUST be before :id
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(ListingController.renderEditForm));

// UPDATE
router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(ListingController.updateListing));

// DELETE
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(ListingController.destroyListing));



module.exports = router;
