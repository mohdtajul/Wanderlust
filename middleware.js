const listing = require('./models/listing')
const ExpressError = require('./utils/ExpressError.js')
const {listingSchema,reviewSchema} = require('./schema.js')
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl=(req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl= req.session.redirectUrl;
  }
  next();
}

module.exports.isOwner = async (req,res,next)=>{
    let {id}= req.params
    // let {listing} = req.body
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(currUser._id)){
         req.flash("error", "You have no permission to edit this one")
        return res.redirect(`/listing/${id}`)
    }
    next()
}

module.exports.validateListing = (req,res,next) =>{
 
    const { error } = listingSchema.validate(req.body);

    if(error){
        const errMsg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    next();
}

module.exports.validateReview = (req,res,next)=>{
    const { error } = reviewSchema.validate(req.body);

    if(error){
        const errMsg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    next();
}