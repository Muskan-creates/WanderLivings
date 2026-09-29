const Listing=require("../models/listing");

module.exports.index=async(req,res)=>{
  const allstays=await Listing.find({});
  res.render("listings/allListing",{allstays});
};

module.exports.renderNewForm=async(req,res)=>{
  res.render("listings/newstay");
};

module.exports.showListing=async(req,res)=>{
  let {id}=req.params;
  let stay=await Listing.findById(id)
    .populate({
      path:"reviews",
      populate:{
        path:"Author"
      },
    })
    .populate("owner");

  if(!stay){
    req.flash("error","Sorry, this listing is no longer available.");
    return res.redirect("/listings/allListing");
  }
  res.render("listings/stay",{stay});
};

module.exports.createListing=async(req,res,next)=>{
  let url=req.file.path;
  let filename=req.file.filename;
  const newstay = new Listing(req.body.listing);
  newstay.owner=req.user._id;
  newstay.image={url,filename};
  await newstay.save();
  req.flash("success","New Listing Created!");
  res.redirect(`/listings/allListing`);
};

module.exports.editListing=async(req,res)=>{
  let {id}=req.params;
  let editstay=await Listing.findById(id);
  if(!editstay){
    req.flash("error","Sorry, this listing is no longer available.");
    return res.redirect("/listings/allListing");
  }
  let originalImageUrl=editstay.image.url;
  originalImageUrl=originalImageUrl.replace("/upload","/upload");
  res.render("listings/edit",{editstay,originalImageUrl});
};

module.exports.updateListing=async(req,res)=>{
  let {id}=req.params;
  let { title, description, image, price, location, country } = req.body.listing;
  let newdetails={title,description,image,price,location,country};
  let listing=await Listing.findByIdAndUpdate(id,newdetails);
  if(typeof req.file!=="undefined"){
  let url=req.file.path;
  let filename=req.file.filename;
  listing.image={url,filename};
  await listing.save();}

  req.flash("success","Listing Updated Successfully!");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing=async(req,res)=>{
  let {id}=req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success","Listing Delete Successfully!");
  res.redirect("/listings/allListing");
}