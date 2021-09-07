import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../table.css";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import { Message } from "../components/Message";
import { listProducts, deleteProduct } from "../actions/productActions";
import styled from "styled-components";

const ButtonDelete = styled.button``;

const ButtonCreateProduct = styled.button`
  background-color: #b3b3b3bf;
  padding: 1.5rem 3rem;
  color: white;
  text-decoration: none;
  font-size: 1.8rem;
  font-weight: bold;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure ")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = (product) => {};

  return (
    <>
      <Navbar />
      <section>
        {loadingDelete && <Loading />}
        {errorDelete && <Message color={"red"}>{errorDelete}</Message>}
        {loading ? (
          <Loading />
        ) : error ? (
          <Message color={"red"}>{error}</Message>
        ) : (
          <>
            <div style={{ textAlign: "right" }}>
              <ButtonCreateProduct onClick={createProductHandler}>
                <i className="fas fa-plus"></i> Create Product
              </ButtonCreateProduct>
            </div>
            <table>
              <caption>Products</caption>
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">NAME</th>
                  <th scope="col">PRICE</th>
                  <th scope="col">CATEGORY</th>
                  <th scope="col">f()</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td data-label="ID">{product._id}</td>
                    <td data-label="NAME">{product.name}</td>
                    <td data-label="PRICE">${product.price}</td>
                    <td data-label="CATEGORY">{product.category}</td>
                    <td data-label="f()">
                      <Link to={`/admin/product/${product._id}/edit`}>
                        <i className="fas fa-edit"></i>
                      </Link>
                      <ButtonDelete onClick={() => deleteHandler(product._id)}>
                        <i className="fas fa-trash"></i>
                      </ButtonDelete>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </section>
    </>
  );
};

export default ProductListScreen;
