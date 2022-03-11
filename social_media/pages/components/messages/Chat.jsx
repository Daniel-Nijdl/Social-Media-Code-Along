import React from "react";
import { Divider, Comment, Icon, List } from "semantic-ui-react";
import { useRouter } from "next/router";
import calculateTime from "../../util/calculateTime";

const Chat = ({ chat, connectedUsers, deleteChat }) => {
  const router = useRouter();

  const isOnline = connectedUsers.find(
    (user) => user.userId === chat.messagesWith
  );

  return (
    <>
      <List selection>
        <List.Item
          active={router.query.message === chat.messagesWith}
          onClick={() =>
            router.push(`/messages?message=${chat.messagesWith}`, undefined, {
              shallow: true,
            })
          }
        >
          <Comment>
            <Comment.Avatar src={chat.profilePicURL} />
            <Comment.Content>
              <Comment.Author as="a">
                {chat.name}{" "}
                {isOnline ? (
                  <Icon name="circle" color="green" size="small" />
                ) : (
                  <Icon name="circle outline" size="small" />
                )}
              </Comment.Author>

              <Comment.Metadata>
                <div>{calculateTime(chat.date)}</div>
                <div
                  style={{
                    position: "absolute",
                    right: "10px",
                    cursor: "pointer",
                  }}
                >
                  <Icon
                    style={{ cursor: "pointer" }}
                    name="trash"
                    color="red"
                    onClick={() => deleteChat(chat.messagesWith)}
                  />
                </div>
              </Comment.Metadata>
              <Comment.Text>
                {chat.lastMessage.length > 20
                  ? `${chat.lastMessage.substring(0, 20)} ...`
                  : chat.lastMessage}
              </Comment.Text>
            </Comment.Content>
          </Comment>
        </List.Item>
      </List>
    </>
  );
};

export default Chat;
