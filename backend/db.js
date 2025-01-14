const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://harsh122:secrect@gofood.9z2zk.mongodb.net/gofoodmern";

const mongoDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Fetch data from the collection
    const fetched_data = mongoose.connection.db.collection("foodData");
    const data = await fetched_data.find({}).toArray();
    global.foodData = data;
    const fetchedCategories = await mongoose.connection.db.collection("foodCategories").find({}).toArray();
    global.foodCategory = fetchedCategories;

    console.log("Data successfully fetched and stored globally");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = mongoDB;
