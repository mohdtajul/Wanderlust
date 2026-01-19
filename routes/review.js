const express = require("express")
const router = express.Router({mergeParams: true})
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js")
const Review = require("../models/reviews.js")
const Listing = require("../models/listing.js") // model imported
const {validateReview} = require('../middleware.js')

//  Post reviews route
router.post("/",validateReview,wrapAsync(async(req,res)=>{
        let listing = await Listing.findById(req.params.id)
        let newReview = new Review(req.body.review)
        await newReview.save()
    
        listing.reviews.push(newReview)
        await listing.save()

        console.log(listing.reviews)
        req.flash("success", "review added  ")
        res.redirect(`/listings/${listing._id}`)
    })
)

// Delete reviews route
router.delete(
    "/:reviewId",
    wrapAsync(async(req,res)=>{
        let {id, reviewId} = req.params;

        await Listing.findByIdAndUpdate(id,{$pull:{reviews: reviewId}})
        await Review.findByIdAndDelete(reviewId)
        req.flash("success", "review deleted ")
        res.redirect(`/listings/${id}`);
    })
)

module.exports = router;