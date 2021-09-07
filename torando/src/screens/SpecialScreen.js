import React from "react";

const SpecialScreen = () => {
  return (
    <div style={{ position: "relative", paddingTop: "6rem" }}>
      <div className="background-half2"></div>
      <div className="special">
        <div className="special-heading">
          <p>Special Kombo</p>
          <h1>
            WE MAKE THE BEST* <br /> BURGER IN YOUR TOWN
          </h1>
        </div>
        <div className="special-content">
          <p>
            As well known and we are very busy all days advice you. advice you
            to call us of before arriving, so we can guarantee your seat. advice
            you to call us of before arriving, so we canAs well known and we are
            very busy all days advice you. advice you to call us of before
            arriving
          </p>
        </div>
        <div className="special-footer">
          <a href="/" className="button-brown">
            Order Online
          </a>
          <div className="special-offer">
            <p>
              $46.99 <span>$59.99</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialScreen;
