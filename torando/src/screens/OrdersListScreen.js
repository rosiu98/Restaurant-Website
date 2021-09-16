import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../table.css";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import { Message } from "../components/Message";
import { listOrders } from "../actions/orderActions";
import { EditLink } from "./UserListScreen";

const OrdersListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push("/login");
    } else {
      dispatch(listOrders());
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <Navbar />
      <section>
        {loading ? (
          <Loading />
        ) : error ? (
          <Message color={"red"}>{error}</Message>
        ) : (
          <>
            <table>
              <caption>Orders</caption>
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">USER</th>
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
                    <td data-label="USER">{order.user && order.user.name}</td>
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
                      <EditLink to={`/order/${order._id}`}>Details</EditLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </section>
    </>
  );
};

export default OrdersListScreen;
