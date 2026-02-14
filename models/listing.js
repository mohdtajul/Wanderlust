const mongoose = require("mongoose")
const Review = require('./reviews.js');

// created schema for collection
const listingSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description: String,
    image:{
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews:[
        {
            type: mongoose.Types.ObjectId,
            ref: 'Review'
        }
    ],
    owner:{
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    geometry:{
        type:{
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }


    }
})

// middleware to delete all listing reviews when listing is deleted
listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}})
    }
})

// created model
const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing;