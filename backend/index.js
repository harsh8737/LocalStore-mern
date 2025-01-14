const express = require("express");
const mongoDB = require("./db");

const app = express();
const PORT = 5000;


mongoDB();


app.use(express.json());


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins for development
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  ); // Specify allowed HTTP methods
  next();
});

// Default route to test server functionality
app.get("/", (req, res) => {
  res.send("API is working");
});

// Use the create user routes
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
