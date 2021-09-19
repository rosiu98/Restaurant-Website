import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { adjustQty, removeFromCart } from "../actions/cartActions";
import trash from "../img/trash.svg";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const [input, setInput] = useState(item.qty);

  const minusHandler = (item) => {
    if (input > 1) {
      dispatch(adjustQty(item.id, --item.qty));
      setInput(input - 1);
    }
  };

  const plusHandler = (item) => {
    dispatch(adjustQty(item.id, ++item.qty));
    setInput(input + 1);
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="cart">
      <Link to={`/menu/${item.product}`} className="cart-product">
        <div className="cart-product-image">
          <img src={`/${item.image}`} alt={item.name} />
        </div>
        <div className="cart-product-main">
          <h1>{item.name}</h1>
          <p>
            Price: <span>${item.price}.00</span>
          </p>
        </div>
      </Link>
      <div className="cart-qty">
        <div
          className="plus"
          //   onClick={() => dispatch(adjustQty(item.id, item.qty + 1))}
          onClick={() => plusHandler(item)}
        >
          +
        </div>
        <input
          type="number"
          value={input}
          //   onChange={() => setInput(item.qty)}
        />
        <div
          className="minus"
          onClick={() => {
            minusHandler(item);
          }}
        >
          -
        </div>
      </div>
      <div className="cart-trash">
        <img
          src={trash}
          alt="trash"
          onClick={() => removeFromCartHandler(item.id)}
        />
      </div>
    </div>
  );
};

export default CartItem;
