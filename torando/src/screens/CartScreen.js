import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";
import FooterScreen from "../screens/FooterScreen";
import styled from "styled-components";
import Lottie from "lottie-react-web";
import animation from "../img/empty-cart.json";
import CartItem from "./CartItem";
import Loading from "../components/Loading";

const ButtonAddToCart = styled(Link)`
  background-color: var(--color-yellow);
  padding: 1.5rem 3rem;
  color: white;
  text-decoration: none;
  font-size: 1.8rem;
  font-weight: bold;
  border-radius: 2rem;
  transition: 0.2s all;
  cursor: pointer;
  text-align: center;
  margin: 0 auto;

  &:hover {
    background-color: var(--color-brown);
  }
`;

export const ButtonAddToCart2 = styled.button`
  background-color: var(--color-yellow);
  padding: 1.5rem 3rem;
  color: white;
  text-decoration: none;
  font-size: 1.8rem;
  font-weight: bold;
  border-radius: 2rem;
  transition: 0.2s all;
  cursor: pointer;
  text-align: center;
  margin: 0 auto;
  border: none;
  font-family: "Roboto";

  &:hover {
    background-color: var(--color-brown);
  }
`;

const EmptyCard = styled.div`
  text-align: center;
  min-height: 20vh;
  padding-bottom: 6rem;

  & a {
    background-color: var(--color-brown);

    &:hover {
      background-color: var(--color-yellow);
    }
  }

  & h1 {
    font-size: 4rem;
    color: var(--color-dark);
  }

  & p {
    font-size: 1.8rem;
    color: grey;
    padding-bottom: 4rem;
  }

  &a {
    text-decoration: none;
  }
`;

const CartScreen = ({ history }) => {
  // const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <Navbar />
      <PageHero title={"/ Cart"} name={"SHOPPING CART"} />
      <div style={{ backgroundColor: "#FAF7F2" }}>
        {cartItems.length === 0 ? (
          <>
            <Lottie
              options={{ animationData: animation }}
              width={"300px"}
            ></Lottie>
            <EmptyCard>
              <h1>Your Cart is Empty</h1>
              <p>
                Looks like you haven't added
                <br />
                anything to your cart
                <br />
              </p>
              <ButtonAddToCart to="/menu">See our Menu</ButtonAddToCart>
            </EmptyCard>
          </>
        ) : (
          <section className="shopping-cart">
            <div className="cart">
              <div className="cart-product">
                <p>PRODUCT/PRICE</p>
              </div>
              <div className="cart-qty">
                <p>QUANTITY</p>
              </div>
              <div className="cart-trash"></div>
            </div>
            {cartItems.map((item, index) => (
              <CartItem item={item} key={index} />
            ))}

            <div className="cart-total">
              <div className="cart-total-box">
                <div className="cart-total-title">
                  <h1>
                    Cart Totals(
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  </h1>
                </div>
                <div className="cart-total-price">
                  <div className="cart-total-item">
                    <p>Subtotal</p>
                    <p>
                      $
                      {cartItems
                        .reduce((acc, item) => acc + item.price * item.qty, 0)
                        .toFixed(2)}
                    </p>
                  </div>
                  <div className="cart-total-item">
                    <p>Delivery</p>
                    <p>$5</p>
                  </div>
                  <div className="cart-total-item">
                    <p>Total</p>
                    <p>
                      {cartItems
                        .reduce((acc, item) => acc + item.price * item.qty, 5)
                        .toFixed(2)}
                    </p>
                  </div>
                </div>
                <ButtonAddToCart2 onClick={checkoutHandler}>
                  Procced to checkout
                </ButtonAddToCart2>
              </div>
            </div>
          </section>
        )}
      </div>

      <FooterScreen />
    </>
  );
};

export default CartScreen;
