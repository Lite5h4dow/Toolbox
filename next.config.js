require("dotenv").config();

module.exports = {
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    mongo_url: process.env.mongo_url,
    mongo_name: process.env.mongo_name,
    local_url: process.env.local_url
  }
};
