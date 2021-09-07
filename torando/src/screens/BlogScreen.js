import React from "react";
import Heading from "../components/Heading";
import arrow from "../img/arrow-brown.svg";
import { blogs } from "../blogs.js";

const BlogScreen = () => {
  return (
    <div
      style={{
        paddingTop: "12.5rem",
        backgroundColor: "#faf7f2",
        paddingBottom: "1rem",
      }}
    >
      <Heading name={"Recent Article"} paragraph={"LATEST NEWS & BLOG"} />
      <div className="blog">
        {blogs.map((blog) => (
          <div className="blog-post" key={blog.id}>
            <div className="blog-heading">
              <p>{blog.date}</p>
              <h3>{blog.title}</h3>
            </div>
            <div className="blog-image">
              <img src={blog.image} alt="blog-post" />
            </div>
            <div className="blog-button">
              <img src={arrow} alt="arrow" />
              <a href="/">READ MORE</a>
            </div>
          </div>
        ))}
      </div>
      <div className="blog-footer">
        <a href="/" className="button-brown">
          SEE ALL BLOG
        </a>
      </div>
    </div>
  );
};

export default BlogScreen;
