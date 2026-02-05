const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const ListingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require('../cloudConfig.js')
const upload = multer({ storage})

router.route('/')
    .get(wrapAsync(ListingController.index))

router.route('/new')
    .get( isLoggedIn, ListingController.renderNewForm)
    .post( isLoggedIn, 
        upload.single("image"),
        validateListing,
        wrapAsync(ListingController.createListing))
    

router.route("/:id")
    .get( wrapAsync(ListingController.showListing))
    .put( isLoggedIn, isOwner,upload.single("listing[image]"), validateListing, wrapAsync(ListingController.updateListing))
    .delete( isLoggedIn, isOwner, wrapAsync(ListingController.destroyListing))

router.route("/:id/edit")
    .get( isLoggedIn, isOwner, wrapAsync(ListingController.renderEditForm))


module.exports = router;
