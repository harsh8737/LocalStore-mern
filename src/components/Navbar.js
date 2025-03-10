import React, { useState } from "react";
import Badge from "react-bootstrap/Badge";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Model";
import Cart from "../screens/Cart";
import { useCart } from "./ContexReducer";

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
   let data = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-success">
        <div className="container-fluid ">
          <Link
            className="navbar-brand fs-1 fst-italic "
            to="/"
            style={{ color: "white" }}
          >
            Local Store
            
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="/navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                  style={{ color: "white" }}
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  {" "}
                  <Link
                    className="nav-link active fs-5"
                    to="/myOrder"
                    
                  >
                    MY Order
                  </Link>{" "}
                </li>
              ) : (
                ""
              )}
            </ul>
            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link className="btn bg-white tect-successs mx-1" to="/login">
                  Login
                </Link>
                <Link className="btn bg-white  text-successs " to="/createuser">
                  SignUp
                </Link>
              </div>
            ) : (
              <div>
                <div className="btn bg-white text-success mx-2" onClick={()=> {setCartView(true)}}>My Cart {""}
                  <Badge  bg="danger">{data.length}</Badge>
                </div>
                {cartView? <Modal onClose={()=> setCartView(false)}><Cart/></Modal>: null}
                <div
                  className="btn bg-white text-danger mx-2"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
