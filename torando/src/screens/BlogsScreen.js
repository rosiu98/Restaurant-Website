import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listBlogs } from "../actions/blogActions";
import Loading from "../components/Loading";
import { Message } from "../components/Message";
import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";
import FooterScreen from "./FooterScreen";

const BlogExample = () => {
  const dispatch = useDispatch();

  const blogList = useSelector((state) => state.blogList);
  const { loading, error, blogs } = blogList;

  useEffect(() => {
    dispatch(listBlogs());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <PageHero name={"RECENT BLOG"} title={"/ Blogs"} />
      {error && <Message>{error}</Message>}
      {loading && <Loading />}
      <div style={{ backgroundColor: "#faf7f2" }}>
        <div className="blog-main">
          <div className="blog-article">
            {blogs.map((blog) => (
              <div className="blog-posts" key={blog._id}>
                <div className="blog-picture">
                  <img src={blog.image} alt={blog.title} />
                </div>
                <div className="blog-date">
                  <i className="far fa-calendar-alt"></i>
                  <p>{blog.createdAt.substring(0, 10)}</p>
                  <hr />
                  <p>{blog.user.name}</p>
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
