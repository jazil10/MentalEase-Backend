const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();

const client = mongoose
  .connect("mongodb://jazil10:VUe7bxZoEpFzD2OZmJZ8enUnOCxsVmYMqBAewzyMUw2f1Qu42jke0YZU46ehBkVAmUDnNXk4brPJACDbOKyYuQ==@jazil10.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@jazil10@", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Azure CosmoDB connected");
  })
  .catch((error) => {
    console.log("Error: ", error);

    return error;
  });

module.exports = client;
