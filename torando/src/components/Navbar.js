import React, { useEffect, useState } from "react";
import logo from "../img/LOGO.svg";
import icon from "../img/Group.svg";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import user from "../img/user.svg";
import { logout } from "../actions/userActions";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

const Navbar = () => {
  // const currentRoute = useHistory().location.pathname.toLowerCase();

  const isDesktop = useMediaQuery({ query: "(min-width: 1170px)" });

  const [showLinks, setShowLinks] = useState(false);
  const dispatch = useDispatch();

  const [list, setList] = useState(false);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (isDesktop) {
      setShowLinks(true);
    } else {
      setShowLinks(false);
    }
  }, [isDesktop]);

  return (
    <nav>
      <Link to="/" className="logo">
        <img src={logo} alt="LOGO" />
      </Link>

      <motion.div className="links" animate={{ x: showLinks ? 0 : -300 }}>
        <NavLink activeClassName="active" to="/" exact>
          HOME
        </NavLink>
        <NavLink activeClassName="active" to="/about">
          ABOUT
        </NavLink>
        <NavLink activeClassName="active" to="/menu">
          MENU
        </NavLink>
        <NavLink activeClassName="active" to="/blogs">
          BLOG
        </NavLink>
        <NavLink activeClassName="active" to="/reservation">
          BOOK A TABLE
        </NavLink>
      </motion.div>

      <div className="buttons">
        <Link
          to={`${cartItems.length > 0 ? "/cart" : "/menu"}`}
          className="button-brown"
        >
          Order Online
        </Link>
        <i
          style={{ fontSize: "4rem" }}
          className="fas fa-bars"
          onClick={() => setShowLinks(!showLinks)}
        ></i>
        <Link to="/cart" style={{ position: "relative" }}>
          <img src={icon} alt="icon-shop" />
          {cartItems.length > 0 && (
            <span>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
          )}
        </Link>
        {userInfo ? (
          <div onClick={() => setList(!list)} className="login-button one">
            <p>{userInfo.name.split(" ")[0]}</p>
            <img
              style={{ width: "40px", height: "40px" }}
              src={user}
              alt="login"
            />
            {list && (
              <div className="links-login">
                <div className="links-item">
                  <Link to="/profile">Profile</Link>
                </div>
                <div onClick={logoutHandler} className="links-item">
                  Logout
                </div>
                {userInfo && userInfo.isAdmin && (
                  <>
                    <div className="links-item">
                      <Link to="/admin/userlist">Users</Link>
                    </div>
                    <div className="links-item">
                      <Link to="/admin/productlist">Products</Link>
                    </div>
                    <div className="links-item">
                      <Link to="/admin/orderlist">Order List</Link>
                    </div>
                    <div className="links-item">
                      <Link to="/admin/blogs">Blogs</Link>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="login-button">
            <p>Login</p>
            <img
              style={{ width: "40px", height: "40px" }}
              src={user}
              alt="login"
            />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
