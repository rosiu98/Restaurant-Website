import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { listProducts } from "../actions/productActions";
import { Message } from "../components/Message";
import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";

const GridMenu = styled.div`
  background-color: #faf7f2;
  padding-top: 6.5rem;
  display: grid;
  grid-template-columns: 0.7fr 0.2fr;
  grid-template-rows: auto;
  grid-template-areas: "items sidebar ";
  justify-content: center;
  grid-template-rows: auto;
  gap: 3.5rem;

  @media (max-width: 1000px) {
    padding: 0 5%;
    grid-template-columns: 1fr;
    grid-template-areas:
      "sidebar"
      "items";
  }
`;

const GridItems = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 30rem));
  justify-content: center;
  grid-area: items;
  gap: 3rem;
`;

const GridItem = styled.div`
  padding: 3rem;
  background-color: white;
  border-radius: 4rem;
  transition: 0.4s all ease-in;

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
  /* width: 70%;
  min-height: 75px;
  object-fit: scale-down;
  vertical-align: middle; */
  width: 220px;
  height: 170px;
  object-fit: scale-down;
  margin-bottom: 2rem;
`;

export const GridName = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  & p {
    font-weight: 500;
    font-size: 1.5rem;
    color: #706c61;

    margin: 0;
  }
`;

export const GridTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: bold;
  margin: 1rem 0 1rem 0;
`;

export const GridPrice = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  margin: 0;
  color: #1e1d23;
`;

const GridSidebar = styled.div`
  grid-area: sidebar;

  & h3 {
    font-size: 1.8rem;
    margin-bottom: 2.4rem;
    text-transform: uppercase;
    font-weight: 700;
    font-family: "Roboto", sans-serif;
  }
`;

const SearchBar = styled.div`
  background-color: white;
  padding: 3.5rem 2rem;
  border-radius: 15px;

  & input {
    width: 100%;
    padding: 2rem;
    color: #949494;
    background-color: #fcfbf9;
    border: none;
    outline: none;
  }

  & div {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fcfbf9;
    border-radius: 8px;
    overflow: hidden;
    border: 2px solid #f7f7f7;
  }

  & i {
    color: #949494;
    font-size: 1.4rem;
    margin-right: 2rem;
  }
`;

const MenuScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);

  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <PageHero name={"MENU"} title={"/ Menu"} />
      <GridMenu>
        <GridItems>
          {products.map((product) => (
            <GridItem key={product._id}>
              <Link to={`/menu/${product._id}`}>
                <GridImage src={`/${product.image}`} alt={product.name} />
                <GridName>
                  <p>{product.category}</p>
                </GridName>
                <GridTitle>{product.name}</GridTitle>
                <GridPrice>PRICE ${product.price}</GridPrice>
              </Link>
            </GridItem>
          ))}
        </GridItems>
        <GridSidebar>
          <SearchBar>
            <h3>SEARCH HERE</h3>
            <div>
              <input type="text" placeholder="Search..." />
              <i className="fas fa-search"></i>
            </div>
          </SearchBar>
        </GridSidebar>
      </GridMenu>
    </>
  );
};

export default MenuScreen;
