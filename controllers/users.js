const User = require("../models/user");
const passport = require("passport");


module.exports.rendersignup=(req,res)=>{
    res.render("users/signup");
};

module.exports.signup=async(req,res,next)=>{
   try{
    let {username,email,password}=req.body;
    const newUser=new User({email,username});
    const registereduser=await User.register(newUser,password);
    req.login(registereduser, (err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","Welcome to WanderLivings!");
        res.redirect("/listings/allListing");
    });}
   catch(e){
    req.flash("error",e.message);
    res.redirect("/signup");
   }
};

module.exports.renderlogin=(req,res)=>{
    res.render("users/login");
};

module.exports.login=(req, res) => {
    req.flash("success", "Welcome back to WanderLivings! You are Logged In!");
    const redirectUrl = res.locals.redirectUrl || "/listings/allListing";
    delete req.session.redirectUrl;
    res.redirect(redirectUrl);
};

module.exports.renderlogout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","you are logged out!");
        res.redirect("/listings/allListing");
    });
};