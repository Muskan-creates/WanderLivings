const express=require("express");
const router=express.Router({ mergeParams: true });
const wrapasync=require("../public/utils/wrapasync.js");
const Listing = require("../models/listing");
const{isLoggedIn,validatereview,isReviewAuthor}=require("../authMiddleware.js");
const reviewController=require("../controllers/reviews.js");

// review
router.post("/",isLoggedIn,validatereview,wrapasync(reviewController.postReview))

// Delete review
router.delete("/:reviewid",isLoggedIn,isReviewAuthor,wrapasync(reviewController.deleteReview));

module.exports=router;