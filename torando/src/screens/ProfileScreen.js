import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { getUserDetails } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import Navbar from "../components/Navbar";
import { Message } from "../components/Message";
import "../table.css";
import PageHero from "../components/PageHero";

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (user) {
        dispatch(listMyOrders());
      }
    }
  }, [history, userInfo, dispatch, user]);

  return (
    <>
      <Navbar />
      <PageHero name={`${userInfo.name}`} title={"/ Profile"} />
      <section>
        {loadingOrders ? (
          <Loading />
        ) : errorOrders ? (
          <Message color={"red"}>{errorOrders}</Message>
        ) : (
          <div>
            <table>
              <caption>My Orders</caption>
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">DATE</th>
                  <th scope="col">TOTAL</th>
                  <th scope="col">PAID</th>
                  <th scope="col">DELIVERED</th>
                  <th scope="col">LINK</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td data-label="ID">{order._id}</td>
                    <td data-label="DATE">
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <td data-label="TOTAL">${order.totalPrice}</td>
                    <td data-label="PAID">
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td data-label="DELIVERED">
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td data-label="LINK">
                      <Link to={`/order/${order._id}`}>Info</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
};

export default ProfileScreen;
