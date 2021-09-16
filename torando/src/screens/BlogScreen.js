import React, { useEffect } from "react";
import Heading from "../components/Heading";
import arrow from "../img/arrow-brown.svg";
import { useDispatch, useSelector } from "react-redux";
import { listNewestBlogs } from "../actions/blogActions";
import Loading from "../components/Loading";
import { Message } from "../components/Message";
import { Link } from "react-router-dom";

const BlogScreen = () => {
  const dispatch = useDispatch();

  const blogNewest = useSelector((state) => state.blogNewest);

  const { loading, error, blogNew } = blogNewest;

  // const newDate = new Date(blogNew.createdAt).toUTCString().substring(6, 17);

  // const mapDate = blogNew.map((blogo) =>
  //   new Date(blogo.createdAt).toUTCString().substring(6, 17)
  // );

  useEffect(() => {
    dispatch(listNewestBlogs());
  }, [dispatch]);

  return (
    <div
      style={{
        paddingTop: "12.5rem",
        backgroundColor: "#faf7f2",
        paddingBottom: "1rem",
      }}
    >
      <Heading name={"Recent Article"} paragraph={"LATEST NEWS & BLOG"} />
      {error && <Message color="red">{error}</Message>}
      {loading && Loading}

      <div className="blog">
        {blogNew.map((blog) => {
          const mapDate = new Date(blog.createdAt)
            .toUTCString()
            .substring(6, 17);

          return (
            <div className="blog-post" key={blog._id}>
              <div className="blog-heading">
                <p>{mapDate}</p>
                <h3>{blog.title.substring(0, 23) + "..."}</h3>
              </div>
              <div className="blog-image">
                <img src={blog.image} alt={blog.title} />
              </div>
              <div className="blog-button">
                <Link to={`/blogs/${blog._id}`}>
                  <img src={arrow} alt="arrow" /> READ MORE
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className="blog-footer">
        <Link to="/blogs" className="button-brown">
          SEE ALL BLOG
        </Link>
      </div>
    </div>
  );
};

export default BlogScreen;
