const { CLOUDINARY } = require("./variables").SERVER;

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  secure: true,
  cloud_name: CLOUDINARY.CLOUD_NAME,
  api_key: CLOUDINARY.API_KEY,
  api_secret: CLOUDINARY.API_SECRET,

});

module.exports = cloudinary;
