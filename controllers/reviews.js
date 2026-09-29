const Listing=require("../models/listing");
const Review=require("../models/reviews.js");

module.exports.postReview=async(req,res)=>{
  let{id}=req.params;
  let listing=await Listing.findById(id);
  let newReview=new Review(req.body.review);
  newReview.Author=req.user._id;
  listing.reviews.push(newReview._id);
  await newReview.save();
  await listing.save();
  req.flash("success","Review added Successfully!");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.deleteReview=async(req,res)=>{
  let {id,reviewid}=req.params;

  await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}});
  await Review.findByIdAndDelete(reviewid);
  req.flash("success","Review deleted Successfully!");
  res.redirect(`/listings/${id}`);
};