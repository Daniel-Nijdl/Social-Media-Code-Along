import axios from "axios";
import Cookies from "js-cookie";
import Router from "next/router";
import React, { useState } from "react";
import { List, Popup, Image } from "semantic-ui-react";
import { baseURL } from "../../util/auth";
import catchErrors from "../../util/catchErrors";
import { LikesPlaceholder } from "../layout/PlaceHolderGroup";

const LikesList = ({ postId, trigger }) => {
  const [likesList, setLikesList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getLikesList = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseURL}/api/v1/posts/likes/${postId}`, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      });
      setLikesList(res.data);
    } catch (error) {
      console.log(catchErrors(error));
      // alert(catchErrors(error));
    }
    setLoading(false);
  };

  return (
    <Popup
      on={"click"}
      style={{cursor: "pointer"}}
      onClose={() => setLikesList([])}
      onOpen={getLikesList}
      popperDependencies={[likesList]}
      trigger={trigger}
      wide
    >
      {loading ? (
        <LikesPlaceholder />
      ) : (
        <>
          {likesList.length && (
            <div
              style={{
                overflow: "auto",
                maxHeight: "15rem",
                height: "15rem",
                minWidth: "210px",
              }}
            >
              <List selection size="large">
                {likesList.map((like) => (
                  <List.Item key={like._id}>
                    <Image avatar src={like.user.profilePicURL} />
                    <List.Content>
                      <List.Header
                        onClick={() => Router.push(`/${like.user.username}`)}
                        as="a"
                        content={like.user.name}
                      />
                    </List.Content>
                  </List.Item>
                ))}
              </List>
            </div>
          )}
        </>
      )}
    </Popup>
  );
};

export default LikesList;
