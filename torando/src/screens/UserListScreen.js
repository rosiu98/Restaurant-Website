import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../table.css";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import { Message } from "../components/Message";
import { listUsers, deleteUser } from "../actions/userActions";
import styled from "styled-components";

const ButtonDelete = styled.button``;

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure ")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <Navbar />
      <section>
        {loading ? (
          <Loading />
        ) : error ? (
          <Message color={"red"}>{error}</Message>
        ) : (
          <table>
            <caption>USERS</caption>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">NAME</th>
                <th scope="col">EMAIL</th>
                <th scope="col">ADMIN</th>
                <th scope="col">f()</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td data-label="ID">{user._id}</td>
                  <td data-label="NAME">{user.name}</td>
                  <td data-label="EMAIL">
                    <a href={`mailto:${user.email}`}> {user.email}</a>
                  </td>
                  <td data-label="ADMIN">
                    {user.isAdmin ? (
                      <i
                        className="fas fa-check"
                        style={{ color: "green" }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td data-label="f()">
                    <Link to={`/admin/user/${user._id}/edit`}>
                      <i className="fas fa-edit"></i>
                    </Link>
                    <ButtonDelete onClick={() => deleteHandler(user._id)}>
                      <i className="fas fa-trash"></i>
                    </ButtonDelete>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
};

export default UserListScreen;
