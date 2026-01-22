const express = require("express")
const router = express.Router({mergeParams: true})
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js")
const Review = require("../models/reviews.js")
const Listing = require("../models/listing.js") // model imported
const {validateReview,isLoggedIn} = require('../middleware.js')

//  Post reviews route
router.post("/",validateReview,isLoggedIn,wrapAsync(async(req,res)=>{
        let listing = await Listing.findById(req.params.id)
        let newReview = new Review(req.body.review)
        newReview.author = req.user._id
        listing.reviews.push(newReview)
        await newReview.save()
        await listing.save()

        console.log(listing.reviews)
        req.flash("success", "review added  ")
        res.redirect(`/listings/${listing._id}`)
    })
)

// Delete reviews route
router.delete(
    "/:reviewId",
    isLoggedIn,
    wrapAsync(async(req,res)=>{
        let {id, reviewId} = req.params;

        await Listing.findByIdAndUpdate(id,{$pull:{reviews: reviewId}})
        await Review.findByIdAndDelete(reviewId)
        req.flash("success", "review deleted ")
        res.redirect(`/listings/${id}`);
    })
)

module.exports = router;