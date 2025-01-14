import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const [orderData, setorderData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchMyOrder = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/myorderData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: localStorage.getItem("userEmail"),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch order data");
      }

      const data = await response.json();
      setorderData(data);
    } catch (error) {
      console.error("Error fetching order data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!orderData.order_data || orderData.order_data.length === 0) {
    return <div className="text-center">No orders found.</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          {orderData.order_data
            .slice(0)
            .reverse()
            .map((order) => (
              <div key={order[1]}>
                <div className="m-auto mt-5">
                  <strong>Order Date:</strong>{" "}
                  {new Date(order[1]).toLocaleDateString()}
                  <hr />
                </div>
                {order[0].map((item) => (
                  <div className="col-12 col-md-6 col-lg-3" key={item.id}>
                    <div
                      className="card mt-3"
                      style={{ width: "16rem", maxHeight: "360px" }}
                    >
                      <img
                        src={item.img}
                        className="card-img-top"
                        alt={item.name}
                        style={{ height: "120px", objectFit: "fill" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <div
                          className="container w-100 p-0"
                          style={{ height: "38px" }}
                        >
                          <span className="m-1">{item.qty}</span>
                          <span className="m-1">{item.size}</span>
                          <div className="d-inline ms-2 h-100 w-20 fs-5">
                            ₹{item.price}/-
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
