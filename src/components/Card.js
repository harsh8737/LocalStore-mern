import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContexReducer";
import PropTypes from "prop-types";

export default function Card(props) {
  let dispatch = useDispatchCart();
  const priceRef = useRef();
  let data = useCart();
  let options = props.options || {};
  let priceOptions = Object.keys(options);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.ImgSrc,
        });
        console.log("Size different so simply ADD one more to the list");
        return;
      }
      return;
    }

    if (dispatch) {
      await dispatch({
        type: "ADD",
        id: props.foodItem._id,
        name: props.foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
        img: props.foodItem.img,
      });
      console.log("Cart updated:", data);
    } else {
      console.error(
        "Dispatch is not available. Make sure CartProvider is set up."
      );
    }
  };

  let finalPrice = qty * parseInt(options[size] || 0);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "360px" }}
        >
          <img
            src={props.foodItem.img}
            className="card-img-top"
            alt="..."
            style={{ height: "180px", objectFit: "fill" }}
          />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <p className="card-text">Delicious food you'll love!</p>
            <select
              className="m-2 h-100 bg-success"
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return <option value={i}>{i + 1}</option>;
              })}
            </select>
            <select
              className="m-2 h-100 bg-success rounded"
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>

            <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
          </div>
          <hr></hr>
          <button
            className={`btn btn-success justify-center ms-2 `}
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

// PropTypes validation and default props
Card.propTypes = {
  foodItem: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
  }).isRequired,
  options: PropTypes.object.isRequired,
};
