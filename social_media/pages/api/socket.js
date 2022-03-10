import { Server } from "socket.io";
import ChatModel from "../../server/models/ChatModel";
import UserModel from "../../server/models/UserModel"
// import { io } from "socket.io-client";

const users = [];

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("socket is initializing");

    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      socket.on("join", async ({ userId }) => {
        console.log(userId);

        const user = users.find((user) => user.userId === userId);

        if (!user) users.push({ userId });

        // setInterval(() => {
        //   socket.emit("connectedUsers", {
        //     users: users.filter((user) => user.userId !== userId),
        //   });
        // }, 10000);
      });

      socket.on("loadMessages", async ({ userId, messagesWith }) => {
        const user = await ChatModel.findOne({ user: userId }).populate(
          "chats.messagesWith"
        );
        const chat = user.chats.find(
          (chat) => chat.messagesWith._id.toString() === messagesWith
        );

        if (!chat) socket.emit("noChatFound");
        else socket.emit("messagesLoaded", { chat });
      });

      socket.on("sendNewMessage", async ({ userId, msgToSendUserId, msg }) => {
        try {
          //! Sender
          const user = await ChatModel.findOne({ user: userId });
          //! Receiver
          const msgToSendUser = await ChatModel.findOne({
            user: msgToSendUserId,
          });
          const newMsg = {
            sender: userId,
            receiver: msgToSendUserId,
            msg,
            date: Date.now(),
          };

          const previousChat = user.chats.find(
            (chat) => chat.messagesWith.toString() === msgToSendUserId
          );

          if (previousChat) {
            previousChat.messages.push(newMsg);
            await user.save();
          } else {
            const newChat = {
              messagesWith: msgToSendUserId,
              messages: [newMsg],
            };
            user.chats.push(newChat);
            await user.save();
          }

          const previousChatForReceiver = msgToSendUser.chats.fine(
            (chat) => chat.messagesWith.toString() === userId
          );

          if (previousChatForReceiver) {
            previousChatForReceiver.messages.push(newMsg);
            await msgToSendUser.save();
          } else {
            const newChat = { messagesWith: userId, messages: [newMsg] };
            msgToSendUser.chats.push(newChat);
            await msgToSendUser.save();
          }

          const receiverSocket = findConnectedUser(msgToSendUserId);

          if (receiverSocket)
            io.to(receiverSocket.socketId).emit("newMsgReceived", { newMsg });
          else {
            const user = await UserModel.findById(msgToSendUserId);
            if (!user.unreadMessage) {
              user.unreadMessage = trueawait;
              await user.save();
            }
          }
        } catch (error) {
          console.log(error);
        }
      });
    });
  }
  res.end();
};

export default SocketHandler;
