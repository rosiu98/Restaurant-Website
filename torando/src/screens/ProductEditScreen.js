import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Message } from "../components/Message";
import Loading from "../components/Loading";
import { listProductDetails, updateProduct } from "../actions/productActions";
import Navbar from "../components/Navbar";
import { InputContainer } from "./ShippingScreen";
import { ButtonAddToCart2 } from "./CartScreen";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setCategory(product.category);
        setDescription(product.description);
      }
    }
  }, [dispatch, product, productId, history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        category,
        description,
        image,
      })
    );
  };

  return (
    <>
      <Navbar />
      <Link to="/admin/productlist" className="btn-goback">
        Go Back
      </Link>
      <form className="form-edit" onSubmit={submitHandler}>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loading />}
        {errorUpdate && <Message color={"red"}>{errorUpdate}</Message>}
        {loading ? (
          <Loading />
        ) : error ? (
          <Message color={"red"} />
        ) : (
          <>
            <InputContainer>
              <h2>Name</h2>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <h2>Price</h2>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <h2>Image</h2>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <h2>Category</h2>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <h2>Description</h2>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </InputContainer>
            <ButtonAddToCart2 type="submit">Edit</ButtonAddToCart2>
          </>
        )}
      </form>
    </>
  );
};

export default ProductEditScreen;
