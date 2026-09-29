const { model } = require("mongoose");

const stays = [

{
  title: "Cozy Beachfront Villa",
  description: "Enjoy stunning ocean views in this cozy beachfront villa.",
  image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  price: 120,
  location: "Goa",
  country: "India"
},

{
  title: "Modern City Apartment",
  description: "Stylish apartment in the heart of the city.",
  image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
  price: 80,
  location: "Mumbai",
  country: "India"
},

{
  title: "Mountain Cabin Retreat",
  description: "Peaceful wooden cabin surrounded by mountains.",
  image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  price: 95,
  location: "Manali",
  country: "India"
},

{
  title: "Luxury Desert Camp",
  description: "Experience the desert in luxury.",
  image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  price: 150,
  location: "Jaisalmer",
  country: "India"
},

{
  title: "Lake View Cottage",
  description: "Charming cottage with lake view.",
  image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
  price: 110,
  location: "Udaipur",
  country: "India"
},

{
  title: "Hilltop Eco Resort",
  description: "Eco-friendly stay with hill views.",
  image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
  price: 130,
  location: "Munnar",
  country: "India"
},

{
  title: "Backwater Houseboat",
  description: "Cruise Kerala backwaters.",
  image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  price: 140,
  location: "Alleppey",
  country: "India"
},

{
  title: "Urban Loft Studio",
  description: "Minimalist loft for solo travelers.",
  image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5",
  price: 70,
  location: "Bangalore",
  country: "India"
},

{
  title: "Heritage Haveli Stay",
  description: "Live like royalty.",
  image: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba",
  price: 160,
  location: "Jaipur",
  country: "India"
},

{
  title: "Forest Treehouse",
  description: "Treehouse in dense forest.",
  image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
  price: 125,
  location: "Wayanad",
  country: "India"
},

{
  title: "Luxury Penthouse",
  description: "High-rise skyline views.",
  image: "https://images.unsplash.com/photo-1505691723518-36a5ac3b2d40",
  price: 200,
  location: "Delhi",
  country: "India"
},

{
  title: "Riverside Cottage",
  description: "Relax beside a river.",
  image: "https://images.unsplash.com/photo-1472224371017-08207f84aaae",
  price: 90,
  location: "Rishikesh",
  country: "India"
},

{
  title: "Beach Shack Stay",
  description: "Fun beach shack.",
  image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  price: 60,
  location: "Goa",
  country: "India"
},

{
  title: "Snow View Chalet",
  description: "Snow mountain views.",
  image: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66",
  price: 170,
  location: "Gulmarg",
  country: "India"
},

{
  title: "Tea Estate Bungalow",
  description: "Stay in tea plantation.",
  image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  price: 135,
  location: "Darjeeling",
  country: "India"
},

{
  title: "Desert Mud House",
  description: "Traditional mud house.",
  image: "https://images.unsplash.com/photo-1518684079-3c830dcef090",
  price: 75,
  location: "Kutch",
  country: "India"
},

{
  title: "Island Beach Villa",
  description: "Private island villa.",
  image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  price: 220,
  location: "Andaman",
  country: "India"
},

{
  title: "City Budget Room",
  description: "Affordable stay.",
  image: "https://images.unsplash.com/photo-1551776235-dde6d482980b",
  price: 40,
  location: "Hyderabad",
  country: "India"
},

{
  title: "Cliffside Cottage",
  description: "Scenic cliff views.",
  image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
  price: 145,
  location: "Varkala",
  country: "India"
},

{
  title: "Luxury Farm Stay",
  description: "Rural luxury.",
  image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
  price: 115,
  location: "Pune",
  country: "India"
},

{
  title: "Historic Fort Stay",
  description: "Stay in a fort.",
  image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da",
  price: 210,
  location: "Jodhpur",
  country: "India"
},

{
  title: "Beachside Bamboo Hut",
  description: "Eco bamboo hut.",
  image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  price: 85,
  location: "Gokarna",
  country: "India"
},

{
  title: "Countryside Villa",
  description: "Peaceful countryside.",
  image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
  price: 125,
  location: "Nashik",
  country: "India"
},

{
  title: "Lake House Retreat",
  description: "Quiet lake house.",
  image: "https://images.unsplash.com/photo-1505691723518-36a5ac3b2d40",
  price: 105,
  location: "Bhopal",
  country: "India"
},

{
  title: "Temple Town Stay",
  description: "Near temples.",
  image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da",
  price: 65,
  location: "Varanasi",
  country: "India"
},

{
  title: "Luxury Ski Chalet",
  description: "Winter sports stay.",
  image: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66",
  price: 230,
  location: "Auli",
  country: "India"
},

{
  title: "Seaside Apartment",
  description: "Sea view balcony.",
  image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
  price: 95,
  location: "Chennai",
  country: "India"
},

{
  title: "Jungle Safari Lodge",
  description: "Close to wildlife.",
  image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  price: 155,
  location: "Jim Corbett",
  country: "India"
},

{
  title: "Artistic Studio Stay",
  description: "Creative studio.",
  image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5",
  price: 75,
  location: "Pondicherry",
  country: "India"
},

{
  title: "Luxury Palace Hotel Room",
  description: "Royal palace stay.",
  image: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba",
  price: 250,
  location: "Udaipur",
  country: "India"
}

];

module.exports={data: stays};