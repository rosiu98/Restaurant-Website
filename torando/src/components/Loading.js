import React from "react";
import Lottie from "lottie-react-web";
import animation from "../img/loader.json";

const Loading = () => {
  return <Lottie options={{ animationData: animation }} />;
};

export default Loading;
