import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import backgorund from "../img/page-background.jpg";
import chef from "../img/women-chef.png";

const PageWrapper = styled.div`
  background-image: url(${backgorund});
  padding: 15.5rem 0;
  position: relative;

  @media (max-width: 1140px) {
    padding: 15.5rem 3rem;
  }
`;

const PageSection = styled.section`
  max-width: 1170px;
  margin: 0 auto;
  /* position: relative; */

  & a {
    font-size: 1.6rem;
    text-decoration: none;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
  }

  & span {
    color: var(--color-yellow);
    font-size: 1.65rem;
    font-weight: 700;
  }

  & img {
    position: absolute;
    right: 15%;
    bottom: 0;

    @media (max-width: 1200px) {
      display: none;
    }
  }
`;

const PageH1 = styled.h1`
  font-size: 6rem;
  color: #fff;
  text-transform: uppercase;
  margin-bottom: 1.3rem;
  font-family: "Lilita One", cursive;
`;

const PageHero = ({ title, product, blogs, name }) => {
  return (
    <PageWrapper>
      <PageSection>
        <div>
          <PageH1>{name}</PageH1>
          <Link to="/">Home </Link>
          {product && <Link to="/menu">/ Menu / </Link>}
          {blogs && <Link to="/blogs">/ Blog / </Link>}
          <span> {title}</span>
        </div>
        <div>
          <img src={chef} alt="chef" />
        </div>
      </PageSection>
    </PageWrapper>
  );
};

export default PageHero;
