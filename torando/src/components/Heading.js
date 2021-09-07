import React from "react";

const Heading = ({ name, paragraph }) => {
  return (
    <div className="heading">
      <p className="heading-p">{name}</p>
      <h1 className="heading-h1">{paragraph}</h1>
    </div>
  );
};

export default Heading;
