import React, { useState, useEffect, useRef } from "react";
import "../login.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { login } from "../actions/userActions";
import background from "../img/background.png";
import profile from "../img/profile.svg";
import Navbar from "../components/Navbar";
import { Message } from "../components/Message";

const LoginScreen = ({ location, history }) => {
  const ref = useRef(null);
  const ref2 = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const focusHandler = () => {
    const focus = ref.current;
    focus.className += " focus";
  };

  const blurHandler = () => {
    if (email === "") {
      let focus = ref.current;
      focus = focus.className.replace(/focus/g, "");

      ref.current.className = focus;
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <>
          <img src={background} alt="backgroud" className="background" />
          <div className="container">
            <div className="img">
              <img src={profile} alt="profile" />
            </div>
            <div className="title">
              <h1>WELCOME</h1>
            </div>
            {error && <Message color="red">{error}</Message>}
            <div className="login-container">
              <form onSubmit={submitHandler}>
                <div
                  ref={ref}
                  onFocus={focusHandler}
                  onBlur={blurHandler}
                  className="input-div one"
                >
                  <div className="i">
                    <i className="fas fa-user"></i>
                  </div>
                  <div>
                    <h5>Email</h5>
                    <input
                      className="input"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div
                  ref={ref2}
                  onFocus={(e) => (ref2.current.className += " focus")}
                  onBlur={(e) => {
                    if (password === "") {
                      ref2.current.className = "input-div two";
                    }
                  }}
                  className="input-div two"
                >
                  <div className="i">
                    <i className="fas fa-lock"></i>
                  </div>
                  <div>
                    <h5>Password</h5>
                    <input
                      className="input"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                {/* <a href="/">Register </a> */}
                <button type="submit" className="btn">
                  LOGIN
                </button>

                <div className="or">OR</div>
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : "/register"}
                  className="register"
                >
                  Create new Account
                </Link>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LoginScreen;
