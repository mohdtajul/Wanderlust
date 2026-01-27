const express = require("express")
const router = express.Router({mergeParams: true})
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js")
const Review = require("../models/reviews.js")
const Listing = require("../models/listing.js") // model imported
const {validateReview,isLoggedIn} = require('../middleware.js')
const reviewController = require("../controllers/reviews.js")

//  Post reviews route
router.post("/",validateReview,isLoggedIn,wrapAsync(reviewController.createReview))

// Delete reviews route
router.delete(
    "/:reviewId",
    isLoggedIn,
    wrapAsync(reviewController.destroyReview))

module.exports = router;