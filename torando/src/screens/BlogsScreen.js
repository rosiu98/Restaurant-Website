import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listBlogs, listNewestBlogs } from "../actions/blogActions";
import Loading from "../components/Loading";
import { Message } from "../components/Message";
import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";
import FooterScreen from "./FooterScreen";

const BlogExample = () => {
  const dispatch = useDispatch();

  const blogList = useSelector((state) => state.blogList);
  const { loading, error, blogs } = blogList;

  const blogNewest = useSelector((state) => state.blogNewest);
  const { blogNew } = blogNewest;

  useEffect(() => {
    dispatch(listBlogs());
    dispatch(listNewestBlogs());
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
                  <h2>
                    <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
                  </h2>
                </div>
                <div className="blog-description">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: blog.description,
                    }}
                  ></p>
                </div>
                <div className="blog-buttons">
                  <Link to={`/blogs/${blog._id}`} className="button-brown">
                    READ MORE
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="blog-sidebar">
            <div className="blog-recent">
              <h3>RECENT POSTS</h3>
              {blogNew.map((blog) => {
                const mapDate = new Date(blog.createdAt)
                  .toUTCString()
                  .substring(6, 17);

                return (
                  <Link
                    to={`/blogs/${blog._id}`}
                    className="blog-recent-post"
                    key={blog._id}
                  >
                    <img src={blog.image} alt={blog.name} />
                    <div className="blog-recent-description">
                      <h4>{blog.title.substring(0, 42)}</h4>

                      <p>
                        <i className="far fa-calendar-alt">{mapDate}</i>
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <FooterScreen />
    </>
  );
};

export default BlogExample;
