import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { listBlogDetails } from "../actions/blogActions";
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
`;

const BlogPageScreen = ({ match }) => {
  const dispatch = useDispatch();

  const blogDetails = useSelector((state) => state.blogDetails);
  const { loading, error, blog } = blogDetails;

  useEffect(() => {
    dispatch(listBlogDetails(match.params.id));
  }, [dispatch, match]);

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
            title={"/ Blog Details"}
          />
          <div style={{ padding: "12rem 0", backgroundColor: "#faf7f2" }}>
            <BlogPageMain>
              <BlogPageHero>
                <img src={blog[0]?.image} alt={blog[0]?.title} />
                <div className="blog-date">
                  <i className="far fa-calendar-alt"></i>
                  <p>13.09.2021</p>
                  <hr />
                  <p>{blog[0]?.user.name}</p>
                </div>
              </BlogPageHero>
              <BlogDetails>
                <h2>{blog[0]?.title}</h2>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Veniam nihil rerum, qui ratione fugit, at ut non laborum
                  suscipit eos distinctio quae magnam illo laboriosam quidem et
                  iusto libero nulla.
                </p>
                <img src={blog[0]?.image} alt={blog[0]?.title} />
              </BlogDetails>
            </BlogPageMain>
          </div>
          <FooterScreen />
        </>
      )}
    </>
  );
};

export default BlogPageScreen;
