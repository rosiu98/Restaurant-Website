import axios from "axios";
import React, { useEffect, useState } from "react";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import { useDispatch, useSelector } from "react-redux";
import { BLOG_UPDATE_RESET } from "../constants/blogConstants";
import { listBlogDetails, updateBlog } from "../actions/blogActions";
import { ButtonAddToCart2 } from "./CartScreen";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { InputContainer } from "./ShippingScreen";
import Loading from "../components/Loading";
import { Message } from "../components/Message";
const BlogEditScreen = ({ match, history }) => {
  const blogId = match.params.id;

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const initialState = EditorState.createEmpty();

  const [editorState, setEditorState] = useState(initialState);

  const dispatch = useDispatch();

  const blogDetails = useSelector((state) => state.blogDetails);
  const { loading, error, blog } = blogDetails;

  const blogUpdate = useSelector((state) => state.blogUpdate);
  const { success: successUpdate } = blogUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: BLOG_UPDATE_RESET });
      history.push("/admin/blogs");
    } else {
      if (!blog[0]?.title || blog[0]?._id !== blogId) {
        dispatch(listBlogDetails(blogId));
      } else {
        setTitle(blog[0]?.title);
        setImage(blog[0]?.image);
        setDescription(blog[0]?.description);

        const contentBlock = htmlToDraft(blog[0]?.description);
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        const editorState = EditorState.createWithContent(contentState);

        setEditorState(editorState);
      }
    }
  }, [dispatch, blog, blogId, history, successUpdate]);

  const uploadFileHanlder = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
    } catch (error) {
      console.error(error);
    }
  };

  //   const onEditorStateChange = (editorState) => {
  //     setEditorState(editorState);
  //   };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateBlog({
        _id: blogId,
        title,
        image,
        description,
      })
    );
  };

  return (
    <>
      <Navbar />
      <Link to="/admin/blogs" className="btn-goback">
        Go Back
      </Link>
      {loading && <Loading />}
      {error && <Message>{error}</Message>}
      <div className="editor">
        <form onSubmit={submitHandler}>
          <InputContainer>
            <h2>Title</h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <h2>Image</h2>
            <input type="file" id="image-file" onChange={uploadFileHanlder} />
          </InputContainer>
          <Editor
            editorState={editorState}
            onEditorStateChange={(newState) => {
              setEditorState(newState);
              setContent(
                draftToHtml(convertToRaw(newState.getCurrentContent()))
              );
              setDescription(
                draftToHtml(convertToRaw(newState.getCurrentContent()))
              );
            }}
            toolbar={{
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
              image: {
                alt: { present: true, mandatory: true },
              },
            }}
          />
          <div
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          ></div>
          <ButtonAddToCart2 type="submit">Edit Blog</ButtonAddToCart2>
        </form>
      </div>
    </>
  );
};

export default BlogEditScreen;
