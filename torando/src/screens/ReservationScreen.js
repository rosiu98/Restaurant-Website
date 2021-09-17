import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";
import { ButtonAddToCart2 } from "./CartScreen";
import FooterScreen from "./FooterScreen";
import DatePicker from "react-datepicker";
import { KeyboardTimePicker } from "@material-ui/pickers";

import "react-datepicker/dist/react-datepicker.css";

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
  select,
  input::placeholder {
    height: 20px;
    font-size: 1.6rem;
    font-family: inherit;
    color: #9d9a9a;
    width: 100%;
    background-color: transparent;
    border: none;
    outline: none;
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
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [person, setPerson] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const handleTimeChange = (date) => {
    setTime(date);
  };

  return (
    <>
      <Navbar />
      <PageHero name={"RESERVATION"} title={"/ Reservation"} />
      <div
        style={{
          backgroundColor: "#faf7f2",
          padding: "12rem 0",
        }}
      >
        <ReservationSection>
          <h2>RESERVE YOUR TABLE</h2>
          <ReservationForm>
            <ReservationInput>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Your Name"
              />
              <i className="fas fa-user"></i>
            </ReservationInput>
            <ReservationInput>
              <input
                type="text"
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
                value={person}
                onChange={(e) => setPerson(e.target.value)}
              >
                <option value="1">1 - Person</option>
                <option value="2">2 - Persons</option>
                <option value="3">3 - Persons</option>
                <option value="4">4 - Persons</option>
                <option value="5">5+ - Persons</option>
              </select>
              <i className="fas fa-chevron-down"></i>
            </ReservationInput>
            <ReservationInput>
              <DatePicker
                closeOnScroll={true}
                // popperPlacement="top-start"
                popperClassName="popperclass"
                selected={date}
                onChange={(date) => setDate(date)}
              />
              <i className="fas fa-calendar"></i>
            </ReservationInput>
            <ReservationInput>
              <KeyboardTimePicker
                // margin="normal"
                emptyLabel="Time"
                // label="Time Picker"
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
