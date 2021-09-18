import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";
import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";
import { ButtonAddToCart2 } from "./CartScreen";
import styled from "styled-components";
import FooterScreen from "./FooterScreen";

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  const FormContainer = styled.form`
    width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    margin-bottom: 13rem;

    @media (max-width: 600px) {
      width: 80%;
    }

    & h1 {
      font-size: 3.2rem;
      color: #1e1d23;
      margin-bottom: 1.5rem;
      margin-top: 3rem;
    }

    & h3 {
      font-size: 2rem;
      margin-bottom: 1.5rem;
    }

    & label {
      font-size: 1.5rem;
      margin-bottom: 3rem;
    }

    & input {
      margin-right: 1rem;
    }
  `;

  return (
    <>
      <Navbar />
      <PageHero name={"PAYMENT METHOD"} title={"/ Payment"} />
      <CheckoutSteps step1 step2 />
      <FormContainer onSubmit={submitHandler}>
        <h1>PAYMENT METHOD</h1>
        <h3>Select Method</h3>
        <label htmlFor="Paypal">
          <input
            type="radio"
            label="Paypal or Credit Card"
            name="paymentMethod"
            id="Paypal"
            value={paymentMethod}
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Paypal or Credit Card
        </label>
        <ButtonAddToCart2>Next</ButtonAddToCart2>
      </FormContainer>
      <FooterScreen />
    </>
  );
};

export default PaymentScreen;
