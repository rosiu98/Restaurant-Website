import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Heading from "../components/Heading";
import styled from "styled-components";
import Rating from "../components/Rating";
import Loading from "../components/Loading";

export const Grid = styled.div`
  margin-top: 6.5rem;
  display: grid;
  grid-template-columns: max-content max-content max-content;
  justify-content: center;
  grid-template-rows: auto;
  gap: 3.5rem;

  @media (max-width: 1000px) {
    grid-template-columns: max-content max-content;
  }

  @media (max-width: 800px) {
    grid-template-columns: max-content;
    padding: 2rem;
  }
`;

export const GridItem = styled.div`
  padding: 6rem;
  background-color: ${(props) => props.color || "#faf7f2"};
  border-radius: 4rem;
  transition: 0.4s all ease-in;

  @media (max-width: 800px) {
    padding: 4rem;
  }

  @media (max-width: 500px) {
    padding: 2rem;
  }

  & a {
    text-decoration: none;
    color: var(--color-dark);
  }

  &:hover img:first-of-type {
    transform: scale(1.1);
    transition: 0.3s all;
  }
`;

export const GridImage = styled.img`
  width: 220px;
  height: 170px;
  object-fit: scale-down;
`;

export const GridName = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  & p {
    font-weight: 500;
    font-size: 1.5rem;
    color: #1e1d23;
    margin: 0;
  }
`;

export const GridTitle = styled.h3`
  font-size: 2rem;
  font-weight: bold;
  margin: 1rem 0 1rem 0;
`;

export const GridPrice = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  margin: 0;
  color: #1e1d23;
`;

export const ProductButton = styled(Link)`
  /* margin-top: 6rem;
  margin-bottom: 5rem; */
  background-color: var(--color-brown);
  padding: 1.5rem 3rem;
  color: white;
  text-decoration: none;
  font-size: 1.8rem;
  font-weight: bold;
  border-radius: 2rem;

  &:hover {
    background-color: var(--color-yellow);
    transform: scale(1.05);
    transition: 0.2s all;
  }
`;

const PopularDishesScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);

  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div
      style={{
        paddingTop: "12.5rem",
        paddingBottom: "6rem",
        position: "relative",
      }}
    >
      <Heading name={"Popular Dishes"} paragraph={"POPULAR DISHES"}></Heading>

      <div className="categories-buttons">
        <button className="category clicked">ALL CATEGORIES</button>
        <button className="category">PIZZA</button>
        <button className="category">BURGER</button>
        <button className="category">KEBAB</button>
        <button className="category">CHICKEN</button>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Grid>
          {products.map((product) => (
            <GridItem key={product._id}>
              <Link to={`/menu/${product._id}`}>
                <GridImage src={`${product.image}`} alt={product.name} />
                <GridName>
                  <p>{product.category}</p>
                  <Rating value={product.rating} />
                </GridName>
                <GridTitle>{product.name}</GridTitle>
                <GridPrice>PRICE ${product.price}</GridPrice>
              </Link>
            </GridItem>
          ))}
        </Grid>
      )}
      <div style={{ textAlign: "center", marginTop: "6rem" }}>
        <ProductButton to="/menu">SEE ALL PRODUCTS</ProductButton>
      </div>
    </div>
  );
};

export default PopularDishesScreen;
