const express=require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync=require("../public/utils/wrapasync");
const passport=require("passport");
const{saveRedirectUrl}=require("../authMiddleware.js");
const usercontroller=require("../controllers/users.js");

// to get the data from user
router.get("/signup",usercontroller.rendersignup);

// For saving data to database
router.post("/signup",wrapAsync (usercontroller.signup));

// For Login 
router.get("/login",usercontroller.renderlogin);

// for saving Login Details
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
 usercontroller.login
);

// for getting Logout Page
router.get("/logout",usercontroller.renderlogout);

module.exports=router; 