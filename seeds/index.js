const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected!");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "627df118b0725713d0d0789d",
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil, earum voluptas! Sunt perspiciatis consectetur veritatis, sed non enim doloremque! Saepe velit eius, nam libero nostrum rerum adipisci? Ipsum, veniam ab!",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dhwg8mmbh/image/upload/v1660330339/YelpCamp/ubvgvblf3ejgn9i5pcko.jpg",
          filename: "YelpCamp/ubvgvblf3ejgn9i5pcko",
        },
        {
          url: "https://res.cloudinary.com/dhwg8mmbh/image/upload/v1660330336/YelpCamp/m6bnrl9palxcfepnhj8x.jpg",
          filename: "YelpCamp/m6bnrl9palxcfepnhj8x",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
