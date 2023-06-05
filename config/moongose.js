const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connnected to Mongodb"))
  .catch((err) => console.error("Error connection to mongodb", err));
