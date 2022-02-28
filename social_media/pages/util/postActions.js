import axios from "axios";
import { baseURL } from "./auth";
import Cookies from "js-cookie";
import catchErrors from "./catchErrors";

const postAxios = axios.create({
  baseURL: `${baseURL}/api/v1/posts`,
  headers: { Authorization: `Bearer ${Cookies.get("token")}` },
});

export const deletePost = async (postId, setPosts, setShowToastr) => {
  try {
    await postAxios.delete(`/${postId}`);
    setPosts((prev) => prev.filter((post) => post._id !== postId));
    setShowToastr(true);
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (postId, userId, setLikes, like = true) => {
  try {
    if (like) {
      await postAxios.post(`/likes/${postId}`);
      setLikes((prev) => [...prev, { user: userId }]);
    } else {
      await postAxios.put(`/likes/${postId}`);
      setLikes((prev) => prev.filter((like) => like.user !== userId));
    }
  } catch (error) {
    console.log(error);
  }
};

export const postComment = async (postId, user, text, setComments, setText) => {
  try {
    const res = await postAxios.post(`/comments/${postId}`, { text });

    const newComment = {
      _id: res.data,
      user,
      text,
      date: Date.now(),
    };

    setComments((prev) => [newComment, ...prev]);
    setText("");
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (postId, commentId, setComments) => {
  try {
    await postAxios.delete(`/comments/${postId}/${commentId}`);
    setComments((prev) => prev.filter((comment) => comment._id !== commentId));
  } catch (error) {
    console.log(error);
  }
};

export const SubmitNewPost = async (
  text,
  location,
  picUrl,
  setPosts,
  setNewPost,
  setError
) => {
  try {
    const res = await postAxios.post("/", { text, location, picUrl });
    setPosts((prev) => [res.data, ...prev])
    setNewPost({text: "", location: ""})
  } catch (error) {
    console.log(error);
    setError(catchErrors(error));
  }
};
