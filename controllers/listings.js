require('dotenv').config();

const Listing = require('../models/listing.js')
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

let mapToken = process.env.MAP_TOKEN
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req,res)=>{
    const allListings = await Listing.find({}) // mongo se pura listings collection ka data liya h
    res.render("listings/index.ejs",{allListings})

}

module.exports.renderNewForm = (req,res)=>{
    res.render("listings/newplace.ejs") // rendering form to get data for listing 
}

module.exports.showListing = async (req, res) => {
  const listing = await Listing
    .findById(req.params.id)
    .populate({
        path:"reviews",
        populate:{
            path: "author",
        },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing you requested for doesn't exist!");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
}

module.exports.createListing = async (req,res,next)=>{
        let response = await geocodingClient.forwardGeocode({
          query: req.body.listing.location,
          limit: 1,
        })
        .send()
       
        let url = req.file.path
        let filename = req.file.filename
        const newListing = new Listing(req.body.listing);
        newListing.owner=req.user._id;
        newListing.image = {url, filename}
        newListing.geometry = response.body.features[0].geometry

        let savedListing = await newListing.save();
        console.log(savedListing)
        req.flash("success", "New Listing Created")
        res.redirect("/listings")
}

module.exports.renderEditForm = async (req,res)=>{
    let {id} = req.params
    const listing = await Listing.findById(id)
    console.log(listing);
    if(!listing){
        req.flash("error", "Listing you requested for doesn't exist !")
        res.redirect("/listings")
    }else{
        let originalImageUrl = listing.image.url;
        originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_200,w_250")
        res.render("listings/edit.ejs",{originalImageUrl,listing})

    }
    
}

module.exports.updateListing = async (req, res) => {

    const { id } = req.params;

    const updatedListing = await Listing.findByIdAndUpdate(id,{...req.body.listing});

    if(typeof req.file != "undefined"){
      let url = req.file.path
      let filename = req.file.filename
      updatedListing.image = {url, filename}
      await updatedListing.save()
    }

    if (!updatedListing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
    }

    req.flash("success", "Listing Updated Successfully");
    res.redirect(`/listings/${updatedListing._id}`);
  }

  module.exports.destroyListing = async(req,res)=>{
      let {id} = req.params
      await Listing.findByIdAndDelete(id)
      req.flash("success", "Listing Deleted")
      res.redirect("/listings")
  
}