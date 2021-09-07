import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageHero from "../components/PageHero";
import Rating from "../components/Rating";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import FooterScreen from "./FooterScreen";
import { listProductDetails } from "../actions/productActions";
import Loading from "../components/Loading";
import { useState } from "react";

const ProductDetails = styled.section`
  padding-top: 12rem;
  padding-bottom: 12rem;
  max-width: 1170px;
  margin: 0 auto;
  display: grid;
  gap: 3rem;
  grid-template-columns: 1fr 1fr;
`;

const ProductImage = styled.div`
  /* background-color: #faf7f2; */
  border: 3px solid #faf7f2;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
`;

const ProductContent = styled.div``;

const ProductTitle = styled.div`
  margin-bottom: 3rem;

  & h1 {
    font-size: 5rem;
    font-family: "Lilita One", cursive;
    color: #1e1d23;
  }

  & p {
    font-size: 17px;
    font-weight: normal;
    line-height: 28px;
    color: #8d8d8d;
    margin-bottom: 15px;
  }

  & ul {
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: 1.6rem;
    color: #706c61;
  }
`;

const ProductPrice = styled.div`
  margin-bottom: 3rem;

  & p {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    font-weight: 700;
    color: #1e1d23;
  }
`;

const ProductButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ProductQty = styled.div`
  display: flex;
  align-items: center;
  background-color: #faf7f2;
  border-radius: 10px;
  flex-basis: 200px;

  & p {
    font-size: 1.6rem;
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    margin-bottom: 0;
    margin-right: 1.7rem;
    margin-top: 0;
    margin-left: 2rem;
  }

  & div {
    font-size: 2rem;
    color: var(--color-dark);
    padding: 1rem;
    cursor: pointer;
  }

  & input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  & input {
    width: 20px;
    outline: none;
    text-align: center;
    border: none;
    background-color: #faf7f2;
    font-weight: bold;
  }
`;

export const ButtonAddToCart = styled.a`
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

  &:hover {
    background-color: var(--color-brown);
  }
`;

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);

  const decreaseInput = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);

  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [match, dispatch]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <div>
      <Navbar />
      <PageHero title={product.name || ""} product name={"PRODUCT DETAILS"} />
      {loading ? (
        <Loading />
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <ProductDetails>
          <ProductImage>
            <img src={`/${product.image}`} alt={product.name} />
          </ProductImage>
          <ProductContent>
            <ProductTitle>
              <h1>{product.name}</h1>
              <p>{product.description}</p>
              <ul>
                <li>Great feature with amzing</li>
                <li>sound 100% new trend with much more</li>
                <li>color Unlimited guarantee</li>
              </ul>
            </ProductTitle>
            <ProductPrice>
              <p>${product.price}.99</p>
              <Rating
                value={product.rating}
                text={`${product.numReviews} Reviews`}
              />
            </ProductPrice>
            <ProductButtons>
              <ProductQty>
                <p>QUANTITY</p>
                <div onClick={decreaseInput}>-</div>
                <input
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                />
                <div onClick={() => setQty(qty + 1)}>+</div>
              </ProductQty>
              <ButtonAddToCart onClick={addToCartHandler}>
                ADD TO CART
              </ButtonAddToCart>
            </ProductButtons>
          </ProductContent>
        </ProductDetails>
      )}
      <FooterScreen />
    </div>
  );
};

export default ProductScreen;
