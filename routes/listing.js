const express=require("express");
const router=express.Router();
const wrapasync=require("../public/utils/wrapasync.js");
const Listing = require("../models/listing");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listing.js");
const multer=require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({storage });


// all listing route INDEX ROUTE
router.get("/allListing",wrapasync(listingController.index));

// get new stay page NEW ROUTE
router.get("/new",isLoggedIn,wrapasync(listingController.renderNewForm));

// show listing route SHOW ROUTE
router.get("/:id",wrapasync(listingController.showListing));

// add new stay CREATE ROUTE
router.post("/add",isLoggedIn,validateListing,upload.single('listing[image]'),wrapasync(listingController.createListing));

// get edit page route EDIT ROUTE
router.get("/:id/edit",isLoggedIn,isOwner,wrapasync(listingController.editListing));

// to add edit details in dbs UPDATE ROUTE
router.put("/:id/submit",isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapasync(listingController.updateListing))

// delete listing
router.delete("/:id",isLoggedIn,isOwner,wrapasync(listingController.deleteListing));

module.exports=router;