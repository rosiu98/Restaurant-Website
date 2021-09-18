import React, { useEffect } from "react";
import image from "../img/time.svg";
import logoColor from "../img/logo-color.svg";
import facebook from "../img/facebook-icon.svg";
import youtube from "../img/youtube.svg";
import instagram from "../img/instagram.svg";
import { useDispatch, useSelector } from "react-redux";
import { listNewestBlogs } from "../actions/blogActions";
import { Link } from "react-router-dom";

const FooterScreen = () => {
  const dispatch = useDispatch();

  const blogNewest = useSelector((state) => state.blogNewest);
  const { blogNew } = blogNewest;

  useEffect(() => {
    dispatch(listNewestBlogs());
  }, [dispatch]);

  return (
    <div className="footer" style={{ paddingTop: "10rem" }}>
      <div className="footer-grid">
        <div className="footer-about">
          <h3 className="footer-h3">ABOUT TORANdO</h3>
          <p>
            Lorem ipsum dolor sit consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore
          </p>
          <div className="footer-hours">
            <img src={image} alt="time" />
            <div className="footer-details">
              <h4 className="footer-h4">OPENING HOURS</h4>
              <p>
                Mon - Sat (8:00 - 6:00)
                <br /> Sunday - Closed
              </p>
            </div>
          </div>
        </div>
        <div className="footer-contact">
          <h3 className="footer-h3">CONTACT US</h3>
          <div className="contact">
            <h4 style={{ display: "inline" }} className="footer-h4">
              ADDRESS
            </h4>
            <p>: 8638 Amarica Stranfod Mailbon Star</p>
          </div>
          <div className="contact">
            <h4 style={{ display: "inline" }} className="footer-h4">
              MAIL
            </h4>
            <p>: support@example.com</p>
          </div>
          <div className="contact">
            <h4 style={{ display: "inline" }} className="footer-h4">
              PHONE
            </h4>
            <p>: +7464 0187 3535 645</p>
          </div>
          <div className="contact">
            <h4 style={{ display: "inline" }} className="footer-h4">
              FAX ID
            </h4>
            <p>: +9 659459 49594</p>
          </div>
        </div>
        <div className="footer-links">
          <h3 className="footer-h3">LINKS</h3>
          <p>Home</p>
          <p>About</p>
          <p>News</p>
          <p>Shop</p>
          <p>Faq</p>
          <p>Contact</p>
        </div>

        <div className="footer-blog">
          <h3 className="footer-h3">RECENT BLOG</h3>
          {blogNew.slice(0, 2).map((blog) => (
            <Link to={`/blogs/${blog._id}`} className="footer-posts">
              <img src={`${blog.image}`} alt="imags" />
              <div className="footer-posts-info">
                <p>{blog.title.substring(0, 25) + "..."}</p>
                <span>{blog.createdAt.substring(0, 10)}</span>
              </div>
            </Link>
          ))}

          {/* <div className="footer-posts">
            <img src={`/${blogs[2].image}`} alt="imags" />
            <div className="footer-posts-info">
              <p>{blogs[2].title}</p>
              <span>{blogs[2].date}</span>
            </div>
          </div> */}
        </div>
      </div>
      <div className="footer-line"></div>
      <div className="footer-bottom">
        <img src={logoColor} alt="logo" />
        <div className="footer-bottom-links">
          <a href="/">
            <img src={facebook} alt="facebook" />
          </a>
          <a href="/">
            <img src={youtube} alt="youtube" />
          </a>
          <a href="/">
            <img src={instagram} alt="instagram" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default FooterScreen;
