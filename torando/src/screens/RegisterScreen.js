import React, { useState, useEffect, useRef } from "react";
import "../login.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { register } from "../actions/userActions";
import background from "../img/background.png";
import profile from "../img/profile.svg";
import Navbar from "../components/Navbar";
import { Message } from "../components/Message";

const RegisterScreen = ({ location, history }) => {
  const ref = useRef(null);
  const ref2 = useRef(null);
  const refName = useRef(null);
  const refConfirm = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const focusHandler = (ref) => {
    const focus = ref;
    focus.className += " focus";
  };

  const blurHandler = (ref, type) => {
    if (type === "") {
      let focus = ref;
      focus = focus.className.replace(/focus/g, "");

      ref.className = focus;
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(register(name, email, password));
    } else {
      setMessage("Password do not match");
    }
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
            {error ? <Message color="red">{error}</Message> : ""}
            {message && <Message color="red">{message}</Message>}
            <div className="login-container">
              <form onSubmit={submitHandler}>
                <div
                  ref={refName}
                  onFocus={() => focusHandler(refName.current)}
                  onBlur={() => blurHandler(refName.current, name)}
                  className="input-div one"
                >
                  <div className="i">
                    <i className="fas fa-user"></i>
                  </div>
                  <div>
                    <h5>Name</h5>
                    <input
                      className="input"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div
                  ref={ref}
                  onFocus={() => focusHandler(ref.current)}
                  onBlur={() => blurHandler(ref.current, email)}
                  className="input-div one"
                >
                  <div className="i">
                    <i className="fas fa-envelope"></i>
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
                  onFocus={() => focusHandler(ref2.current)}
                  onBlur={() => {
                    blurHandler(ref2.current, password);
                  }}
                  className="input-div one"
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
                <div
                  ref={refConfirm}
                  onFocus={() => focusHandler(refConfirm.current)}
                  onBlur={() => {
                    blurHandler(refConfirm.current, confirmPassword);
                  }}
                  className="input-div two"
                >
                  <div className="i">
                    <i className="fas fa-lock"></i>
                  </div>
                  <div>
                    <h5>Confirm Password</h5>
                    <input
                      className="input"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>

                {/* <a href="/">Register </a> */}
                <button type="submit" className="btn">
                  REGISTER
                </button>

                <div className="or">OR</div>
                <Link to="/login" className="register">
                  Login
                </Link>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RegisterScreen;
