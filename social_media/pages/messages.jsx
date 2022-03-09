import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { baseURL } from "./util/auth";
import { Segment, Header, Divider, Comment, Grid } from "semantic-ui-react";
import ChatListSearch from "./components/chat/ChatListSearch";

const scrollDivToBottom = (divRef) =>
  divRef.current !== null &&
  divRef.current.scrollIntoView({ behavior: "smooth" });

const messages = ({ chatsData, user }) => {
  const [chats, setChats] = useState([chatsData]);
  const router = useRouter();
  const socket = useRef();
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [bannerData, setBannerData] = useState({ name: "", profilePicUrl: "" });

  const divRef = useRef();
  const openChatId = useRef("");

  useEffect(() => {
    startServer();
  }, []);

  const startServer = async () => {
    await fetch("/api/socket");
    socket.current = io();

    socket.current.on("connect", () => {
      console.log("connected");
    });

    socket.current.on("connectedUsers", ({ users }) => {
      users.length > 0 && setConnectedUsers(users);
    });

    socket.current.emit("join", { userId: user._id });
  };

  useEffect(() => {
  socket.current.emit('loadMessages', {userId: user._id, messagesWith: router.query.message})
  }, [router.query.message])
  

  const deleteChat = async (messagesWith) => {
    try {
      await axios.delete(`${baseURL}/api/v1/messages/${messagesWith}`, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      });

      setChats((prev) =>
        prev.filter((chat) => chat.messagesWith !== messagesWith)
      );
      router.push("/messages", undefined, { shallow: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Segment>
      <Header
        icon="home"
        content="Go Back"
        onClick={() => router.push("/")}
        style={{ cursor: "pointer" }}
      />
      <Divider hidden />
      <div style={{ marginTop: "10px" }}>
        <ChatListSearch chats={chats} setChats={setChats} />
      </div>
      {chats.length > 0 ? (
        <>
          <Grid stackable>
            <Grid.Column width={4}>
              <Comment.Group size="big">
                <Segment
                  raised
                  style={{ overflow: "auto", maxHeight: "32rem" }}
                >
                  {chats.map((chat, i) => (
                    <p key={i}>Chat Component</p>
                  ))}
                </Segment>
              </Comment.Group>
            </Grid.Column>
            <Grid.Column width={14}>
              {router.query.message && (
                <>
                  <div
                    style={{
                      overflow: "auto",
                      overflowX: "hidden",
                      maxHeight: "32rem",
                      height: "32rem",
                      backgroundColor: "whitesmoke",
                    }}
                  >
                    <div style={{ position: "sticky", top: "0" }}>
                      <p>Banner Component</p>
                    </div>
                    {messages.length > 0 &&
                      messages.map((message, i) => (
                        <p key={i}>Message Component</p>
                      ))}
                  </div>

                  <p>Message Input Component</p>
                </>
              )}
            </Grid.Column>
          </Grid>
        </>
      ) : (
        <p>No Chats</p>
      )}
    </Segment>
  );
};

messages.getInitialProps = async (ctx) => {
  try {
    const { token } = parseCookies(ctx);
    const res = await axios.get(`${baseURL}/api/v1/messages`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { chatsData: res.data };
  } catch (error) {
    return { errorLoading: true };
  }
};

export default messages;
