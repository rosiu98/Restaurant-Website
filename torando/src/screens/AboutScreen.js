import Lottie from "lottie-react-web";
import React from "react";
import styled from "styled-components";
import Heading from "../components/Heading";
import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";
import { ButtonAddToCart2 } from "./CartScreen";
import FooterScreen from "./FooterScreen";
import hamburger from "../img/burger.json";
import { Link } from "react-router-dom";

const AboutContainer = styled.div`
  max-width: 1170px;
  margin: 0 auto;
  width: 80%;
  padding: 12rem 0;

  .heading-h1 {
    @media (max-width: 1000px) {
      font-size: 4rem;
    }
  }
`;

const AboutMain = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: flex-start;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

const AboutImages = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 0.3fr 0.3fr;
  gap: 2rem;

  & img {
    width: 100%;
    border-radius: 10px;
  }
`;

const AboutContent = styled.div`
  .heading {
    text-align: left !important;
  }

  & ul {
    list-style: none;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    margin-bottom: 2rem;
  }

  & li {
    display: flex;
    align-items: center;
    gap: 1.5rem;

    & p {
      color: #1b2026;
      font-size: 1.8rem;
      font-weight: 500;
    }
  }

  & i {
    padding: 1.5rem;
    background-color: white;
    border-radius: 10px;
  }
`;

const AboutParagraph = styled.p`
  margin-top: 1.5rem;
  font-size: 1.7rem;
  font-weight: normal;
  line-height: 28px;
  color: #8d8d8d;
  margin-bottom: 1.5rem;
`;

const AboutColumn = styled.div`
  padding: 5rem;
  background-color: white;
  width: 100%max-content;
  margin: 12rem auto;
  position: relative;
  border-radius: 20px;

  .heading {
    width: 70%;
    text-align: left;
    margin-bottom: 3rem;

    @media (max-width: 1000px) {
      width: 100%;
    }
  }

  & div:last-child {
    position: absolute;
    right: 0;
    top: 0;

    @media (max-width: 1000px) {
      display: none;
    }
  }
`;

const AboutScreen = () => {
  return (
    <>
      <Navbar />
      <PageHero name="ABOUT US" title="/ About" />
      <div style={{ backgroundColor: "#faf7f2" }}>
        <AboutContainer>
          <AboutMain>
            <AboutImages>
              <img
                src="./images/blog/blog1.png"
                alt="food"
                style={{ gridColumn: "2 / span 2", gridRow: "3" }}
              />
              <img src="./images/blog/blog2.jpg" alt="food2" />
              <img src="./images/blog/blog3.jpg" alt="food3" />
              <img
                src="./images/blog/about.jpg"
                alt="food4"
                style={{ gridColumn: "1 / span 2" }}
              />
              <img src="./images/blog/about1.jpg" alt="food3" />
              <img
                src="./images/blog/about3.jpg"
                alt="food3"
                style={{ gridColumn: "3", gridRow: "2" }}
              />
            </AboutImages>
            <AboutContent>
              <Heading
                name={"Who We Are?"}
                paragraph={
                  "BEST BURGER IDEAS & TRADITIONS FROM THE WHOLE WORLD"
                }
              ></Heading>
              <AboutParagraph>
                Back in 1993, three Kiwi guys including world-renowned chef
                Peter Moor set up the first Gloreya Burger Kitchen in Battersea,
                South London Burger Kitchen in
              </AboutParagraph>
              <ul>
                <li>
                  <i className="fas fa-check"></i>
                  <p>Quality products</p>
                </li>
                <li>
                  <i className="fas fa-check"></i>
                  <p>Fastest delivery</p>
                </li>
                <li>
                  <i className="fas fa-check"></i> <p>World’s best Chef</p>
                </li>
                <li>
                  <i className="fas fa-check"></i> <p>Great Location</p>
                </li>
              </ul>
              <Link to="/reservation">
                <ButtonAddToCart2>BOOK A TABLE</ButtonAddToCart2>
              </Link>
            </AboutContent>
          </AboutMain>

          <AboutColumn>
            <Heading
              name={"Fastest delivery"}
              paragraph={"FASTEST DELIVERY ON YOUR DOOR STEP"}
            />
            <Link to="/menu">
              <ButtonAddToCart2>ORDER NOW</ButtonAddToCart2>
            </Link>
            <Lottie
              options={{ animationData: hamburger }}
              width={"300px"}
            ></Lottie>
          </AboutColumn>
        </AboutContainer>
      </div>
      <FooterScreen />
    </>
  );
};

export default AboutScreen;
