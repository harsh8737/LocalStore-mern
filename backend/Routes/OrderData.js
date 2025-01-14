const express = require("express");
const router = express.Router();
const Order = require("../models/Order"); // Replace with the correct path to your Order model

router.post("/orderData", async (req, res) => {
  try {
    let data = req.body.order_data;
    data.splice(0, 0, { Order_date: req.body.order_date }); // Add order_date to the beginning of the array

    console.log("Request email:", req.body.email);

    // Check if user already exists in the database
    let eId = await Order.findOne({ email: req.body.email });

    if (!eId) {
      console.log("New user, creating order...");
      await Order.create({
        email: req.body.email,
        order_date: req.body.order_date, // Include order_date here
        order_data: [data],
      });
      return res.status(200).json({ success: true });
    } else {
      console.log("Existing user, updating order...");
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      );
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ error: error.message }); // Proper error response
  }
});

router.post('/myorderData', async (req, res) => {
  try {
    let myData = await Order.findOne({ 'email': req.body.email });
    res.json({orderData:myData})
  } catch (error) {
    return res.status(500).json({ error: error.message }); // Proper error response

  }
})

module.exports = router;

