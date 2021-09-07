import React from "react";
import how from "../img/how.png";

const HowItWorksScreen = () => {
  return (
    <div
      style={{
        paddingTop: "12.5rem",
        paddingBottom: "12.5rem",
        position: "relative",
      }}
    >
      <div className="background-half"></div>
      <div className="how-content">
        <h1>HOW IT WORKS</h1>
        <img src={how} alt="how it works" />
      </div>
    </div>
  );
};

export default HowItWorksScreen;
