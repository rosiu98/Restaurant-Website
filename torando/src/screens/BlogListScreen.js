import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../table.css";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import { Message } from "../components/Message";
import { BLOG_CREATE_RESET } from "../constants/blogConstants";
import styled from "styled-components";
import { createBlog, deleteBlog, listBlogs } from "../actions/blogActions";
import { ButtonDelete, EditLink } from "./UserListScreen";

const ButtonCreateProduct = styled.button`
  background-color: #b3b3b3bf;
  padding: 1.5rem 3rem;
  color: white;
  text-decoration: none;
  font-size: 1.8rem;
  font-weight: bold;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

const BlogListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const blogList = useSelector((state) => state.blogList);
  const { loading, error, blogs } = blogList;

  const blogDelete = useSelector((state) => state.blogDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = blogDelete;

  const blogCreate = useSelector((state) => state.blogCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    blog: createdBlog,
  } = blogCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: BLOG_CREATE_RESET });
    if (!userInfo.isAdmin) {
      history.push("/login");
    }
    if (successCreate) {
      history.push(`/admin/blogs/${createdBlog._id}/edit`);
    } else {
      dispatch(listBlogs());
    }
    if (successDelete) {
      dispatch(listBlogs());
    }
  }, [dispatch, history, userInfo, successCreate, successDelete, createdBlog]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure ")) {
      dispatch(deleteBlog(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createBlog());
  };

  return (
    <>
      <Navbar />
      <section>
        {loadingDelete && <Loading />}
        {errorDelete && <Message color={"red"}>{errorDelete}</Message>}
        {loadingCreate && <Loading />}
        {errorCreate && <Message color={"red"}>{errorCreate}</Message>}
        {loading ? (
          <Loading />
        ) : error ? (
          <Message color={"red"}>{error}</Message>
        ) : (
          <>
            <div style={{ textAlign: "right" }}>
              <ButtonCreateProduct onClick={createProductHandler}>
                <i className="fas fa-plus"></i> Create Blog
              </ButtonCreateProduct>
            </div>
            <table>
              <caption>Blogs</caption>
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">TITLE</th>
                  <th scope="col">f()</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog._id}>
                    <td data-label="ID">{blog._id}</td>
                    <td data-label="TITLE">{blog.title} </td>
                    <td data-label="f()">
                      <EditLink to={`/admin/blogs/${blog._id}/edit`}>
                        <i className="fas fa-edit"></i>
                      </EditLink>
                      <ButtonDelete onClick={() => deleteHandler(blog._id)}>
                        <i className="fas fa-trash"></i>
                      </ButtonDelete>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </section>
    </>
  );
};

export default BlogListScreen;
