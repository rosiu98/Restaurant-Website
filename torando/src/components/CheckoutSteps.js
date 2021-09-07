import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import complete from "../img/complete.svg";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 13rem;
  margin-bottom: 2rem;
  gap: 3rem;

  & a {
    font-size: 1.5rem;
    color: black;
  }

  & img {
    width: 15px;
    height: 15px;
    margin-left: 5px;
  }
`;

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Container>
      {step1 ? (
        <Link to="/login">
          Sign In
          <img src={complete} alt="complete"></img>
        </Link>
      ) : (
        <Link className="disabled-link">Sign In</Link>
      )}
      {step2 ? (
        <Link to="/shipping">
          Shipping
          <img src={complete} alt="complete"></img>
        </Link>
      ) : (
        <Link className="disabled-link">Shipping</Link>
      )}
      {step3 ? (
        <Link to="/payment">
          Payment <img src={complete} alt="complete"></img>
        </Link>
      ) : (
        <Link className="disabled-link">Payment</Link>
      )}
      {step4 ? (
        <Link to="/placeorder">
          Place Order <img src={complete} alt="complete"></img>
        </Link>
      ) : (
        <Link className="disabled-link">Place Order</Link>
      )}
    </Container>
  );
};

export default CheckoutSteps;
