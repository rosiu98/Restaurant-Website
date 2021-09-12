import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { Message } from "./Message";
import { listTopProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Heading from "./Heading";
import arrowRight from "../img/arrow-right.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";

// import Swiper core and required modules
import SwiperCore, { Autoplay, Navigation } from "swiper/core";
import {
  GridImage,
  GridItem,
  GridName,
  GridPrice,
  GridTitle,
} from "../screens/PopularDishesScreen";
import Rating from "./Rating";

// install Swiper modules
SwiperCore.use([Autoplay, Navigation]);

const ProductTop = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loading />
  ) : error ? (
    <Message color={"red"}>{error}</Message>
  ) : (
    <div
      style={{
        width: "80%",
        margin: "0 auto",
        position: "relative",
        marginBottom: "12rem",
      }}
    >
      <Heading paragraph={"Our Popular Products"} />

      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".swiper-button-next-unique",
          prevEl: ".swiper-button-prev-unique",
        }}
        className="mySwiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <GridItem key={product._id}>
              <Link to={`/menu/${product._id}`}>
                <GridImage src={`/${product.image}`} alt={product.name} />
                <GridName>
                  <p>{product.category}</p>
                  <Rating value={product.rating} />
                </GridName>
                <GridTitle>{product.name}</GridTitle>
                <GridPrice>PRICE ${product.price}</GridPrice>
              </Link>
            </GridItem>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-button-next-unique">
        <img src={arrowRight} alt="strzałka w prawo" />
      </div>
      <div className="swiper-button-prev-unique">
        <img src={arrowRight} alt="strzałka w prawo" />
      </div>
    </div>
  );
};

export default ProductTop;
