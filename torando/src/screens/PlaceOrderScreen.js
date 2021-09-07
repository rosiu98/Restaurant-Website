import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { Message } from "../components/Message";
import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";
import { ButtonAddToCart2 } from "./CartScreen";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  // Calculate prices
  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  cart.shippingPrice = 5;

  cart.totalPrice = (
    Number(cart.itemsPrice) + Number(cart.shippingPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <Navbar />
      <PageHero name={"Order"} title={"/ placeorder"} />
      <div style={{ backgroundColor: "#FAF7F2" }}>
        <CheckoutSteps step1 step2 step3 />
        <section className="place-order">
          <div className="place-order-items">
            <div className="shipping">
              <h2>SHIPPING</h2>
              <p>
                <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.postalCode} {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>
            <div className="payment">
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong> {cart.paymentMethod}
              </p>
            </div>
            <div className="order">
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message color="grey">Your cart is empty</Message>
              ) : (
                <div className="order-items">
                  {cart.cartItems.map((item, index) => (
                    <div className="order-item" key={index}>
                      <div className="order-image">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="order-details">
                        <Link to={`/menu/${item.product}`}>{item.name}</Link>
                        <p>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="place-order-summary">
            <h2>Order Summary</h2>
            <div className="place-order-summary-item">
              <p>Items</p> <p>${cart.itemsPrice.toFixed(2)}</p>
            </div>
            <div className="place-order-summary-item">
              <p>Shipping</p> <p>${cart.shippingPrice.toFixed(2)}</p>
            </div>
            <div className="place-order-summary-item">
              <p>Total</p> <p>${cart.totalPrice}</p>
            </div>
            {error && <Message color="red">{error}</Message>}
            <ButtonAddToCart2 onClick={placeOrderHandler}>
              Place Order
            </ButtonAddToCart2>
          </div>
        </section>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
