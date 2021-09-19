import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../table.css";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import { Message } from "../components/Message";
import { listReservations } from "../actions/reservationActions";

const ReservationListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const reservationList = useSelector((state) => state.reservationList);
  const { loading, error, reservations } = reservationList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push("/login");
    }

    dispatch(listReservations());
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
              <caption>Reservations</caption>
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">NAME</th>
                  <th scope="col">PHONE</th>
                  <th scope="col">PERSONS</th>
                  <th scope="col">DATE AND TIME</th>
                  <th scope="col">Details</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((product) => (
                  <tr key={product._id}>
                    <td data-label="ID">{product._id}</td>
                    <td data-label="NAME">{product.name}</td>
                    <td data-label="PHONE">{product.phone}</td>
                    {/* "persons": "2",
        "date": "2021-09-23T20:01:43.000Z",
        "time": "2021-09-17T19:17:43.010Z",
        "email": "admin@example.com",
        "comment": "", */}
                    <td data-label="PERSONS">{product.persons}</td>
                    <td data-label="DATE AND TIME">
                      {product.date.substring(0, 10)}{" "}
                      {product.time.split("T")[1].substring(0, 5)}
                    </td>
                    <td data-label="Details">
                      <button>Details</button>
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

export default ReservationListScreen;
