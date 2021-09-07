import React from "react";
import tortilla from "../img/tortilla.png";
import facebook from "../img/facebook-icon.svg";
import twitter from "../img/twitter.svg";
import instagram from "../img/instagram.svg";
import circle from "../img/circle.png";
import leafs from "../img/leafs.png";
import kolo from "../img/kolo.png";

const LandingScreen = () => {
  return (
    <main>
      <div className="content">
        <div className="content-text">
          <h1>ARE YOU HUNGRY?</h1>
        </div>
        <div className="content-paragraph">
          <p>
            As well known and we are very busy all days advice you. advice you
            to call us of before arriving.
          </p>
        </div>

        <div className="content-buttons">
          <a href="/" className="button-brown">
            Order Online
          </a>
          <a href="/" className="button-yellow">
            Menu
          </a>
        </div>

        <div className="content-links">
          <a href="/">
            <img src={facebook} alt="facebook icon" />
            <span>FACEBOOK</span>
          </a>

          <a href="/">
            <img src={twitter} alt="twitter icon" />
            <span>TWITTER</span>
          </a>

          <a href="/">
            <img src={instagram} alt="instagram icon" />
            <span>INSTAGRAM</span>
          </a>
        </div>
      </div>

      <div className="circle">
        <img src={circle} alt="circle" />
      </div>
      <div className="photo">
        <div className="leafs">
          <img src={leafs} alt="liscie" />
        </div>
        <div className="kolo">
          <img src={kolo} alt="kolo" />
        </div>
        <div className="photo-text">
          <p>TORTILLA</p>
        </div>
        <div className="tortilla">
          <img src={tortilla} alt="tortilla" />
        </div>
      </div>
    </main>
  );
};

export default LandingScreen;
