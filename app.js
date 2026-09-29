if(process.env.NODE_ENV!="production"){
  require('dotenv').config();
}
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

const mongoose = require("mongoose");

const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");
const ExpressError=require("./public/utils/ExpressError.js");

const session=require("express-session");
const flash=require("connect-flash");

const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");

const listingRouter=require("./routes/listing.js")
const reviewRouter=require("./routes/reviews.js");
const userRouter=require("./routes/user.js");


const sessionOption={
  secret:"mysupersecretcode",
  resave:false,
  saveUninitialized:true,
  cookie: {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.engine('ejs', ejsmate);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

// for session
app.use(session(sessionOption));

// for flash msg
app.use(flash());

// To initialize passport
app.use(passport.initialize());

// To identify users as they browse from page to page
app.use(passport.session());

// to authenticate users and requests using authentication function hashing algo used is pbkdf2
passport.use(new LocalStrategy(User.authenticate()));

// To store information related to User
passport.serializeUser(User.serializeUser());

// To destore information related to User
passport.deserializeUser(User.deserializeUser());

// Middleware for flashing msg
app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.CurrUser=req.user;
  next();
});

app.use("/listings",listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/",userRouter);

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,"public")))

app.all("/*splat", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

main()
.then(()=>{
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.ATLASDB_URL);
}

// Express Error handler
app.use((req, res, next) => {
  next(new ExpressError(404, "Page not Found!"));
});

// Middleware
app.use((err,req,res,next)=>{
  let{statusCode=505, message="Something went wrong!"}=err;
  res.status(statusCode).render("./listings/error", { message });
  // res.status(statusCode).send(message);
});

app.listen(port,()=>{
  console.log(`app is listening to the port ${port}`)
});