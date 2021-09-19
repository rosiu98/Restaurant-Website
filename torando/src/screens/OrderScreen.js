import React, { useEffect, useState } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";
import Loading from "../components/Loading";
import { Message } from "../components/Message";
import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";
import { ButtonAddToCart2 } from "./CartScreen";

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    // order._id !== orderId

    if (!order || successPay || order._id !== orderId || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, successDeliver, order, userInfo, history]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loading />
  ) : error ? (
    <Message color={"red"}>{error}</Message>
  ) : (
    <>
      <Navbar />
      <PageHero
        name={`Order ${order?._id.toString().substring(0, 10)}...`}
        title={"/ Order"}
      />
      <div style={{ backgroundColor: "#FAF7F2" }}>
        <section className="place-order done">
          <div className="place-order-items">
            <div className="shipping">
              <h2>SHIPPING</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                {" "}
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong> {order.shippingAddress.address},{" "}
                {order.shippingAddress.postalCode} {order.shippingAddress.city},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message color={"green"}>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message color={"red"}>Not Delivered</Message>
              )}
            </div>
            <div className="payment">
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message color={"green"}>Paid on {order.paidAt}</Message>
              ) : (
                <Message color={"red"}>Not Paid</Message>
              )}
            </div>
            <div className="order">
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message color="grey">Order is empty</Message>
              ) : (
                <div className="order-items">
                  {order.orderItems.map((item, index) => (
                    <div className="order-item" key={index}>
                      <div className="order-image">
                        <img src={`/${item.image}`} alt={item.name} />
                      </div>
                      <div className="order-details">
                        <Link to={`/menu/${item.id}`}>
                          {item.name}
                          <div>
                            {item.toppings.map((item) => (
                              <span>{item}</span>
                            ))}
                          </div>
                        </Link>
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
              <p>Items</p> <p>${order.totalPrice - order.shippingPrice}</p>
            </div>
            <div className="place-order-summary-item">
              <p>Shipping</p> <p>${order.shippingPrice.toFixed(2)}</p>
            </div>
            <div className="place-order-summary-item">
              <p>Total</p> <p>${order.totalPrice}</p>
            </div>
            {!order.isPaid && (
              <div style={{ width: "90%", margin: "0 auto" }}>
                {loadingPay && <Loading />}
                {!sdkReady ? (
                  <Loading />
                ) : (
                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={successPaymentHandler}
                  />
                )}
              </div>
            )}
            {loadingDeliver && <Loading />}
            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <ButtonAddToCart2 onClick={deliverHandler}>
                  {" "}
                  Mark As Delivered{" "}
                </ButtonAddToCart2>
              )}
          </div>
        </section>
      </div>
    </>
  );
};

export default OrderScreen;
