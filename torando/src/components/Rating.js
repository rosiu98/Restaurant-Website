import React from "react";
import fullStar from "../img/star.svg";
import halfStar from "../img/half-star.svg";
import emptyStar from "../img/empty-star.svg";

const Rating = ({ value, text }) => {
  return (
    <div className="rating">
      <span>
        <img
          src={value >= 1 ? fullStar : value >= 0.5 ? halfStar : emptyStar}
          alt="star"
        />
      </span>
      <span>
        <img
          src={value >= 2 ? fullStar : value >= 1.5 ? halfStar : emptyStar}
          alt="star"
        />
      </span>
      <span>
        <img
          src={value >= 3 ? fullStar : value >= 2.5 ? halfStar : emptyStar}
          alt="star"
        />
      </span>
      <span>
        <img
          src={value >= 4 ? fullStar : value >= 3.5 ? halfStar : emptyStar}
          alt="star"
        />
      </span>
      <span>
        <img
          src={value >= 5 ? fullStar : value >= 4.5 ? halfStar : emptyStar}
          alt="star"
        />
      </span>
      <span>{text && text}</span>
    </div>
  );
};

export default Rating;
