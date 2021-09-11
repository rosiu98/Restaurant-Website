import React from "react";
import Meta from "../components/Meta";
import Navbar from "../components/Navbar";
import BlogScreen from "./BlogScreen";
import FooterScreen from "./FooterScreen";
import HowItWorksScreen from "./HowItWorksScreen";
import LandingScreen from "./LandingScreen";
import PopularDishesScreen from "./PopularDishesScreen";
import PopularScreen from "./PopularScreen";
import SpecialScreen from "./SpecialScreen";

const HomeScreen = () => {
  return (
    <>
      <Meta />
      <Navbar />
      <LandingScreen />
      <PopularScreen />
      <HowItWorksScreen />
      <PopularDishesScreen />
      <SpecialScreen />
      <BlogScreen />
      <FooterScreen />
    </>
  );
};

export default HomeScreen;
