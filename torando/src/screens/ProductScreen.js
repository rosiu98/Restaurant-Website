import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageHero from "../components/PageHero";
import Rating from "../components/Rating";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import FooterScreen from "./FooterScreen";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import Loading from "../components/Loading";
import { useState } from "react";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import { Message } from "../components/Message";
import { Link } from "react-router-dom";
import { ButtonAddToCart2 } from "./CartScreen";
import ProductTop from "../components/ProductTop";
import Meta from "../components/Meta";

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
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const decreaseInput = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted!");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [match, dispatch, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <div>
      <Navbar />
      <PageHero title={product?.name || ""} product name={"PRODUCT DETAILS"} />
      {loading ? (
        <Loading />
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <>
          <Meta title={product.name} />
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
            <div className="reviews">
              <h2 className="review-title">Reviews</h2>
              {product.reviews.length === 0 && (
                <div
                  style={{
                    marginLeft: "3rem",
                    marginBottom: "2rem",
                  }}
                >
                  <Message color={"#5f95e7b8"}>No Reviews </Message>
                </div>
              )}
              {product.reviews.map((review) => (
                <ul className="review-comment" key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </ul>
              ))}
              <ul className="customer-review">
                <h2>Write a Customer Review</h2>
                {errorProductReview && (
                  <Message color={"red"}>{errorProductReview} </Message>
                )}
                {userInfo ? (
                  <form className="comment-form" onSubmit={submitHandler}>
                    <label htmlFor="rating">Rating</label>
                    <select
                      name="rating"
                      id="rating"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="">Select...</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excelent</option>
                    </select>
                    <label htmlFor="comment">Comment</label>
                    <textarea
                      row="3"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <ButtonAddToCart2 type="submit">Submit</ButtonAddToCart2>
                  </form>
                ) : (
                  <Message>
                    Please <Link to="/login">sign in</Link> to write a review
                  </Message>
                )}
              </ul>
            </div>
          </ProductDetails>
        </>
      )}

      <ProductTop />
      <FooterScreen />
    </div>
  );
};

export default ProductScreen;
