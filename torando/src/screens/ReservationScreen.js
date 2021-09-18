import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";
import { ButtonAddToCart2 } from "./CartScreen";
import FooterScreen from "./FooterScreen";
import DatePicker from "react-datepicker";
import { KeyboardTimePicker } from "@material-ui/pickers";

import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { createReservation } from "../actions/reservationActions";
import Loading from "../components/Loading";
import { Message } from "../components/Message";
import Popup from "../components/Popup";

import popupImage from "../img/PopupAdded.svg";

const ReservationSection = styled.div`
  width: 1170px;
  margin: 0 auto;
  padding: 5rem 4rem;
  background-color: white;
  border-radius: 15px;

  & h2 {
    margin: 0;
    line-height: 1;
    font-size: 4.5rem;
    margin-bottom: 3.8rem;
    text-align: center;
    text-transform: uppercase;
    color: var(--color-dark);
    font-family: "Lilita One", cursive;
  }
`;

const ReservationForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  & button {
    grid-column: 1 / span 2;
  }
`;

const ReservationInput = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem;
  border: 1px solid #faf7f2;
  background-color: #fbfaf7;
  justify-content: space-between;
  position: relative;

  & input,
  select {
    height: 20px;
    font-size: 1.6rem;
    font-family: inherit;
    color: var(--color-dark);
    width: 100%;
    background-color: transparent;
    border: none;
    outline: none;
  }

  & input::placeholder {
    color: #9d9a9a;
  }

  & textarea,
  label {
    width: 100%;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 1.6rem;
    font-family: inherit;
    color: var(--color-dark);
  }

  & p {
    font-size: 1.6rem;
    font-family: inherit;
    color: #9d9a9a;
    margin-bottom: 2rem;
  }

  & select {
    -moz-appearance: none; /* Firefox */
    -webkit-appearance: none; /* Safari and Chrome */
    appearance: none;
    z-index: 1;

    & option:checked {
      font-weight: bold;
    }
  }

  & i {
    color: #999;
  }

  & .fa-chevron-down {
    position: absolute;
    right: 2.1rem;
    z-index: 0;
  }

  &:last-of-type {
    grid-column: 1 / span 2;
  }
`;

const ReservationScreen = () => {
  const dispatch = useDispatch();

  const [buttonPopup, setButtonPopup] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [persons, setPersons] = useState("1");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const reservationCreate = useSelector((state) => state.reservationCreate);
  const { loading, error, reservation } = reservationCreate;

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const handleTimeChange = (date) => {
    setTime(date);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createReservation({
        name,
        phone,
        persons,
        date,
        time,
        email,
        comment,
      })
    );

    setName("");
    setPhone("");
    setPersons("1");
    setDate(new Date());
    setTime(new Date());
    setEmail("");
    setComment("");

    setButtonPopup(true);
  };

  return (
    <>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <img src={popupImage} alt="Confirm" />
        <h1>RESERVATION ADDED!</h1>

        <div className="popup-info">
          <div>
            <h4>Name:</h4>
            <p>{reservation?.name}</p>
          </div>
          <div>
            <h4>Phone:</h4>
            <p>{reservation?.phone}</p>
          </div>
          <div>
            <h4>Persons:</h4>
            <p>{reservation?.persons}</p>
          </div>
          <div>
            <h4>Date:</h4>
            <p>{reservation?.date.substring(0, 10)} </p>
          </div>
          <div>
            <h4>Time:</h4>
            <p>{reservation?.time.split("T")[1].substring(0, 5)}</p>
          </div>
        </div>
      </Popup>
      <Navbar />
      <PageHero name={"RESERVATION"} title={"/ Reservation"} />
      <div
        style={{
          backgroundColor: "#faf7f2",
          padding: "12rem 0",
        }}
      >
        {loading && Loading}
        {error && <Message>{error}</Message>}
        <ReservationSection>
          <h2>RESERVE YOUR TABLE</h2>
          <ReservationForm onSubmit={submitHandler}>
            <ReservationInput>
              <input
                type="text"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Your Name"
              />
              <i className="fas fa-user"></i>
            </ReservationInput>
            <ReservationInput>
              <input
                type="tel"
                pattern="[0-9]{9}"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter Your Number"
              />
              <i className="fas fa-phone"></i>
            </ReservationInput>
            <ReservationInput>
              <select
                name="person"
                id="person"
                value={persons}
                onChange={(e) => setPersons(e.target.value)}
              >
                <option value="1">1 - Person</option>
                <option value="2">2 - Persons</option>
                <option value="3">3 - Persons</option>
                <option value="4">4 - Persons</option>
                <option value="5+">5+ - Persons</option>
              </select>
              <i className="fas fa-chevron-down"></i>
            </ReservationInput>
            <ReservationInput>
              <DatePicker
                closeOnScroll={true}
                // popperPlacement="top-start"
                popperClassName="popperclass"
                required
                selected={date}
                onChange={(date) => setDate(date)}
              />
              <i className="fas fa-calendar"></i>
            </ReservationInput>
            <ReservationInput>
              <KeyboardTimePicker
                // margin="normal"
                // emptyLabel="Time"
                placeholder="Time"
                // label="Time Picker"
                required
                value={time}
                onChange={handleTimeChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />

              <i className="fas fa-clock"></i>
            </ReservationInput>
            <ReservationInput>
              <input
                type="text"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
              />
              <i className="fas fa-envelope"></i>
            </ReservationInput>
            <ReservationInput>
              <label htmlFor="comments">
                <p>Message</p>
                <textarea
                  name="comments"
                  id="comments"
                  cols="30"
                  rows="10"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </label>
            </ReservationInput>
            <ButtonAddToCart2 type="submit">Reserve Table</ButtonAddToCart2>
          </ReservationForm>
        </ReservationSection>
      </div>
      <FooterScreen />
    </>
  );
};

export default ReservationScreen;
