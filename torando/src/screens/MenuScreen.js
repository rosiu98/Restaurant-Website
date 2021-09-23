import React, { useEffect, useState } from "react";
import { Route } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { listProducts, listTopProducts } from "../actions/productActions";
import Loading from "../components/Loading";
import { Message } from "../components/Message";
import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";
import Rating from "../components/Rating";
import SearchBox from "../components/SearchBox";
import FooterScreen from "./FooterScreen";

const GridMenu = styled.div`
  background-color: #faf7f2;
  padding: 6.5rem 3rem;
  display: grid;
  grid-template-columns: 0.7fr 0.2fr;
  grid-template-rows: auto;
  grid-template-areas: "items sidebar ";
  justify-content: center;
  grid-template-rows: auto;
  gap: 3rem;

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
  align-items: center;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fit, 25rem);
  }

  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fit, 25rem);
    margin-bottom: 12rem;
  }
`;

const GridItem = styled.div`
  padding: 3rem;
  align-self: baseline;
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

  @media (max-width: 1200px) {
    width: 100%;
  }
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

  @media (max-width: 1000px) {
    margin-top: 12rem;
  }

  & h3 {
    font-size: 1.8rem;
    margin-bottom: 2.4rem;
    text-transform: uppercase;
    font-weight: 700;
    font-family: "Roboto", sans-serif;
  }
`;

export const SearchBar = styled.div`
  background-color: white;
  padding: 3.5rem 2rem;
  border-radius: 15px;
  margin-bottom: 3rem;

  & h2 {
    font-size: 1.8rem;
    margin-bottom: 2.4rem;
    text-transform: uppercase;
    font-weight: 700;
    font-family: "Roboto", sans-serif;
  }

  & input {
    width: 100%;
    padding: 2rem;
    color: #949494;
    background-color: #fcfbf9;
    border: none;
    outline: none;
  }

  & form {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fcfbf9;
    border-radius: 8px;
    overflow: hidden;
    border: 2px solid #f7f7f7;
  }

  & button {
    margin-right: 2rem;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;

    &:hover i {
      transform: scale(1.1);
      transition: 0.2s all ease-in-out;
      color: var(--color-black);
    }
  }

  & i {
    color: #949494;
    font-size: 1.4rem;
  }
`;

const Categories = styled.div`
  background-color: white;
  padding: 3.5rem 2rem;
  border-radius: 15px;
  margin-bottom: 3rem;

  & :last-child {
    margin: 0;
  }

  & button {
    width: 100%;
    padding: 2rem;
    color: #949494;
    margin-bottom: 2rem;
    background-color: #fcfbf9;
    border: none;
    outline: none;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
      color: var(--color-yellow);
    }
  }
`;

const TopProducts = styled.div`
  background-color: white;
  padding: 3.5rem 2rem;
  border-radius: 15px;

  & :last-child {
    margin-bottom: 0;
  }
`;

const MenuScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);

  const { loading, error, products } = productList;

  const productTopRated = useSelector((state) => state.productTopRated);
  const { products: productsTop } = productTopRated;

  const [menuItems, setMenuItems] = useState([]);

  const uniqueValues = (data, type) => {
    let unique = data.map((item) => item[type]);
    return ["ALL", ...new Set(unique)];
  };

  const categories = uniqueValues(products, "category");

  const filterItems = (category) => {
    const newItems = products.filter((item) => item.category === category);

    setMenuItems(newItems);
  };

  useEffect(() => {
    dispatch(listProducts(keyword));
    dispatch(listTopProducts());
  }, [dispatch, keyword]);

  return (
    <>
      <Navbar />
      <PageHero name={"MENU"} title={"/ Menu"} />
      {loading ? (
        <Loading />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <GridMenu>
            <GridItems>
              {menuItems.length > 0
                ? menuItems.map((product) => (
                    <GridItem key={product._id}>
                      <Link to={`/menu/${product._id}`}>
                        <GridImage
                          src={`/${product.image}`}
                          alt={product.name}
                        />
                        <GridName>
                          <p>{product.category}</p>
                        </GridName>
                        <GridTitle>{product.name}</GridTitle>
                        <GridPrice>PRICE ${product.price}</GridPrice>
                      </Link>
                    </GridItem>
                  ))
                : products.map((product) => (
                    <GridItem key={product._id}>
                      <Link to={`/menu/${product._id}`}>
                        <GridImage
                          src={`/${product.image}`}
                          alt={product.name}
                        />
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
                <Route
                  render={({ history }) => <SearchBox history={history} />}
                />
              </SearchBar>
              <Categories>
                <h3>CATEGORIES</h3>
                <div>
                  {categories.map((c, index) => {
                    if (c === "ALL") {
                      return (
                        <button
                          key={index}
                          type="button"
                          name="category"
                          onClick={() => filterItems(c)}
                        >
                          <Link
                            to="/menu"
                            style={{ color: "inherit", width: "100%" }}
                          >
                            ALL
                          </Link>
                        </button>
                      );
                    } else {
                      return (
                        <button
                          key={index}
                          type="button"
                          name="category"
                          onClick={() => filterItems(c)}
                        >
                          {c}
                        </button>
                      );
                    }
                  })}
                </div>
              </Categories>
              <TopProducts>
                <h3>TOP PRODUCTS</h3>
                {productsTop.map((product) => (
                  <div className="top-rated" key={product._id}>
                    <div className="top-rated-image">
                      <img src={`/${product.image}`} alt={product.name} />
                    </div>
                    <div className="top-rated-details">
                      <Rating value={product.rating} />
                      <Link to={`/menu/${product._id}`}>{product.name}</Link>
                      <p>${product.price}</p>
                    </div>
                  </div>
                ))}
              </TopProducts>
            </GridSidebar>
          </GridMenu>
          <FooterScreen />
        </>
      )}
    </>
  );
};

export default MenuScreen;
