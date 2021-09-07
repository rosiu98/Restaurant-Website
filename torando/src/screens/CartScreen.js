import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";
import FooterScreen from "../screens/FooterScreen";
import trash from "../img/trash.svg";
import styled from "styled-components";
import Lottie from "lottie-react-web";
import animation from "../img/empty-cart.json";

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
    padding-bottom: 1.5rem;
  }

  &a {
    text-decoration: none;
  }
`;

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const minusHandler = (item) => {
    if (item.qty > 1) {
      dispatch(addToCart(item.product, item.qty - 1));
    }
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
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
              <ButtonAddToCart to="/">See our Menu</ButtonAddToCart>
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
            {cartItems.map((item) => (
              <>
                <div className="cart" key={item.product}>
                  <Link to={`/menu/${item.product}`} className="cart-product">
                    <div className="cart-product-image">
                      <img src={`/${item.image}`} alt={item.name} />
                    </div>
                    <div className="cart-product-main">
                      <h1>{item.name}</h1>
                      <p>
                        Price: <span>${item.price}.00</span>
                      </p>
                    </div>
                  </Link>
                  <div className="cart-qty">
                    <div
                      className="plus"
                      onClick={() =>
                        dispatch(addToCart(item.product, item.qty + 1))
                      }
                    >
                      +
                    </div>
                    <input
                      type="number"
                      value={item.qty}
                      onChange={(e) => e.target.value}
                    />
                    <div className="minus" onClick={() => minusHandler(item)}>
                      -
                    </div>
                  </div>
                  <div className="cart-trash">
                    <img
                      onClick={() => removeFromCartHandler(item.product)}
                      src={trash}
                      alt="trash"
                    />
                  </div>
                </div>
              </>
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
