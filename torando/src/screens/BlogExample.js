import React from "react";
import { Link } from "react-router-dom";
import blog from "../blog";
import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";
import FooterScreen from "./FooterScreen";

const BlogExample = () => {
  return (
    <>
      <Navbar />
      <PageHero name={"RECENT BLOG"} title={"/ Blogs"} />
      <div style={{ backgroundColor: "#faf7f2" }}>
        <div className="blog-main">
          <div className="blog-article">
            {blog.map((blog) => (
              <div className="blog-posts" key={blog.id}>
                <div className="blog-picture">
                  <img src={blog.image} alt={blog.title} />
                </div>
                <div className="blog-date">
                  <i className="far fa-calendar-alt"></i>
                  <p>{blog.createdAt.toLocaleDateString()}</p>
                  <hr />
                  <p>{blog.user}</p>
                </div>
                <div className="blog-title">
                  <h2>{blog.title}</h2>
                </div>
                <div className="blog-description">
                  <p>{blog.description}</p>
                </div>
                <div className="blog-buttons">
                  <Link to="/" className="button-brown">
                    READ MORE
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="blog-sidebar">
            <h1>I'm Sidebar</h1>
          </div>
        </div>
      </div>
      <FooterScreen />
    </>
  );
};

export default BlogExample;
