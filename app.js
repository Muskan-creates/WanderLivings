if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");

const mongoose = require("mongoose");

const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");
const ExpressError = require("./public/utils/ExpressError.js");

const session = require("express-session");
const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/reviews.js");
const userRouter = require("./routes/user.js");


// =========================
// Session Configuration
// =========================

const sessionOption = {
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,

    cookie: {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};


// =========================
// EJS Configuration
// =========================

app.engine("ejs", ejsmate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


// =========================
// Middleware
// =========================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "public")));


// =========================
// Session
// =========================

app.use(session(sessionOption));


// =========================
// Flash Messages
// =========================

app.use(flash());


// =========================
// Passport
// =========================

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// =========================
// Global Variables
// =========================

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.CurrUser = req.user;

    next();
});


// =========================
// Routes
// =========================

app.use("/listings", listingRouter);

app.use("/listings/:id/reviews", reviewRouter);

app.use("/", userRouter);


// =========================
// 404 Route
// =========================

app.all("/*splat", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});


// =========================
// Error Handler
// =========================

app.use((err, req, res, next) => {
    let {
        statusCode = 500,
        message = "Something went wrong!"
    } = err;

    res.status(statusCode).render("./listings/error", {
        message
    });
});


// =========================
// MongoDB + Server
// =========================

async function main() {
    try {

        await mongoose.connect(process.env.ATLASDB_URL, {
    family: 4,
    serverSelectionTimeoutMS: 30000
});

        console.log("MongoDB Atlas connection successful");

        app.listen(port, () => {
            console.log(`App is listening on port ${port}`);
        });

    } catch (err) {

        console.error("MongoDB connection failed:");
        console.error(err);

    }
}

main();