import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { listBlogDetails, listNewestBlogs } from "../actions/blogActions";
import Loading from "../components/Loading";
import { Message } from "../components/Message";
// import blog from "../blog";
import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";
import FooterScreen from "./FooterScreen";

const BlogPageMain = styled.div`
  max-width: 1170px;
  margin: 0 auto;
  /* margin-top: 12rem; */
  background-color: white;
  padding: 3rem;
  border-radius: 15px;

  & h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Lilita One", cursive;
    font-size: 1.9rem;
    text-transform: uppercase;
    line-height: 40px;
    margin-bottom: 17px;
    color: var(--color-dark);
    width: 95%;
  }
`;

const BlogPageHero = styled.div`
  & img {
    width: 100%;
    max-height: 300px;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const BlogDetails = styled.div`
  & p {
    font-size: 1.7rem;
    font-weight: normal;
    line-height: 28px;
    color: #8d8d8d;
    width: 95%;
  }

  img {
    text-align: center;
    display: block;
    margin: 0 auto;
    border-radius: 10px;
  }
`;

const BlogNewest = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 2rem;
  margin: 3rem 0;
  padding: 3rem 0;
  border-bottom: 1px solid #f4f0e9;
  border-top: 1px solid #f4f0e9;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    gap: 3.5rem;

    & img {
      object-fit: cover;
    }
  }

  & img {
    width: 100%;
    height: 360px;
    border-radius: 15px;
    filter: brightness(0.9);
  }

  h2 {
    font-size: 2.4rem;
  }
`;

const BlogNewestDesc = styled(Link)`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  & p {
    font-size: 1.7rem;
    font-weight: normal;
    line-height: 28px;
    color: #8d8d8d;
    width: 95%;
  }

  &:hover {
    & h2 {
      color: var(--color-yellow);
      transition: 0.2s all ease-in-out;
    }
  }
`;

const BlogPageScreen = ({ match }) => {
  const dispatch = useDispatch();

  const blogDetails = useSelector((state) => state.blogDetails);
  const { loading, error, blog } = blogDetails;

  const blogNewest = useSelector((state) => state.blogNewest);
  const { blogNew } = blogNewest;

  useEffect(() => {
    dispatch(listBlogDetails(match.params.id));
    dispatch(listNewestBlogs());
  }, [dispatch, match]);

  const newDate = new Date(blog[0]?.createdAt).toUTCString().substring(6, 17);

  return (
    <>
      {error && <Message>{error}</Message>}
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <PageHero
            name={`${blog[0]?.title.substring(0, 18)}...`}
            blogs
            title={" Blog Details"}
          />
          <div style={{ padding: "12rem 0", backgroundColor: "#faf7f2" }}>
            <BlogPageMain>
              <BlogPageHero>
                <img src={blog[0]?.image} alt={blog[0]?.title} />
                <div className="blog-date">
                  <i className="far fa-calendar-alt"></i>
                  <p>{newDate}</p>
                  <hr />
                  <p>{blog[0]?.user.name}</p>
                </div>
              </BlogPageHero>
              <BlogDetails>
                <h2>{blog[0]?.title}</h2>
                <p
                  dangerouslySetInnerHTML={{
                    __html: blog[0]?.description,
                  }}
                ></p>
              </BlogDetails>
              <BlogNewest>
                {blogNew.slice(0, 2).map((blog) => (
                  <div key={blog._id}>
                    <div>
                      <img src={blog.image} alt={blog.title} />
                    </div>
                    <BlogNewestDesc to={`/blogs/${blog._id}`}>
                      <h2>{blog.title}</h2>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: blog.description,
                        }}
                      ></p>
                    </BlogNewestDesc>
                  </div>
                ))}
              </BlogNewest>
            </BlogPageMain>
          </div>
          <FooterScreen />
        </>
      )}
    </>
  );
};

export default BlogPageScreen;
