import axios from "axios";
import Cookies from "js-cookie";
import { Router } from "next/router";
import { baseURL } from "./auth";
import catchErrors from "./catchErrors";

const profileAxios = axios.create({
  baseURL: `${baseURL}/api/v1/profile`,
  headers: { Authorization: `Bearer ${Cookies.get("token")}` },
});

export const followUser = async (userToFollowId, setLoggedUserFollowStats) => {
  try {
    await profileAxios.post(`/follow/${userToFollowId}`);

    setLoggedUserFollowStats((prev) => ({
      ...prev,
      following: [...prev.following, { user: userToFollowId }],
    }));
  } catch (error) {
    console.log(error);
  }
};

export const unfollowUser = async (
  userToUnFollowId,
  setLoggedUserFollowStats
) => {
  try {
    await profileAxios.post(`/unfollow/${userToUnFollowId}`);
    setLoggedUserFollowStats((prev) => ({
      ...prev,
      following: prev.following.filter(
        (following) => following.user !== userToUnFollowId
      ),
    }));
  } catch (error) {
    console.log(error);
  }
};
