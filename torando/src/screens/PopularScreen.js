import React from "react";
import Heading from "../components/Heading";
import popcorn from "../img/popcorn.svg";
import chicken from "../img/chicken.png";
import hamburger from "../img/hamburger.svg";
import chicken1 from "../img/chicken1.svg";
import zdjecie from "../img/zdjecie1.png";
import wings from "../img/wings.png";
import arrowRight from "../img/arrow-right.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";

// import Swiper core and required modules
import SwiperCore, { Autoplay, Navigation } from "swiper/core";

// install Swiper modules
SwiperCore.use([Autoplay, Navigation]);

const PopularScreen = () => {
  return (
    <div className="margin-top" style={{ backgroundColor: "#FAF7F2" }}>
      <Heading name={"Our Popular Menu"} paragraph={"WENT TO EAT?"} />

      <Swiper
        breakpoints={{
          // when window width is >= 640px
          640: {
            width: 640,
            slidesPerView: 1,
          },
          // when window width is >= 768px
          768: {
            width: 768,
            slidesPerView: 2,
          },
          1140: {
            width: 768,
            slidesPerView: 3,
          },
        }}
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
        <SwiperSlide>
          <div className="item">
            <img src={popcorn} alt="popcorn" />
            <h1>01</h1>
            <h2>BOX MEALS</h2>
            <p>Rorem ipsum advolu ptateme volupta tem Rorem ipsuey</p>
            <div className="item-photo">
              <img src={chicken} alt="chicken" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="item">
            <img src={hamburger} alt="popcorn" />
            <h1>02</h1>
            <h2>COMBO PACK</h2>
            <p>Rorem ipsum advolu ptateme volupta tem Rorem ipsuey</p>
            <div className="item-photo">
              <img src={zdjecie} alt="hamburger" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="item">
            <img src={chicken1} alt="chcicken1" />
            <h1>03</h1>
            <h2>BOX MEALS</h2>
            <p>Rorem ipsum advolu ptateme volupta tem Rorem ipsuey</p>
            <div className="item-photo">
              <img src={wings} alt="chicken" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="item">
            <img src={popcorn} alt="popcorn" />
            <h1>04</h1>
            <h2>BOX MEALS</h2>
            <p>Rorem ipsum advolu ptateme volupta tem Rorem ipsuey</p>
            <div className="item-photo">
              <img src={chicken} alt="chicken" />
            </div>
          </div>
        </SwiperSlide>
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

export default PopularScreen;
