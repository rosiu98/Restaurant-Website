import React, { useState } from "react";
import logo from "../img/LOGO.svg";
import icon from "../img/Group.svg";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import user from "../img/user.svg";
import { logout } from "../actions/userActions";

const Navbar = () => {
  // const currentRoute = useHistory().location.pathname.toLowerCase();
  const dispatch = useDispatch();

  const [list, setList] = useState(false);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <nav>
      <div className="logo">
        <img src={logo} alt="LOGO" />
      </div>

      <div className="links">
        <NavLink activeClassName="active" to="/" exact>
          HOME
        </NavLink>
        <NavLink activeClassName="active" to="/about">
          ABOUT
        </NavLink>
        <NavLink activeClassName="active" to="/menu">
          MENU
        </NavLink>
      </div>

      <div className="buttons">
        <Link
          to={`${cartItems.length > 0 ? "/cart" : "/menu"}`}
          className="button-brown"
        >
          Order Online
        </Link>
        <Link to="/cart" style={{ position: "relative" }}>
          <img src={icon} alt="icon-shop" />
          {cartItems.length > 0 && <span>{cartItems.length}</span>}
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
