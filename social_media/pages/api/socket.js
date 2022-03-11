import { Server } from "socket.io";
import ChatModel from "../../server/models/ChatModel";

const users = [];

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
    console.log("Socket is running");

    io.on("connection", (socket) => {
      socket.on("join", ({ userId }) => {
        const user = users.find((user) => user.userId === userId);

        if (!user) users.push({ userId });

        // setInterval(() => {
        //   socket.emit("connectedUsers", {
        //     users: users.filter((user) => user.userId !== userId),
        //   });
        // }, 10000);
      });

      socket.on("sendNewMsg", async ({ userId, msgSendToUserId, msg }) => {
        try {
          //! Sender
          const user = await ChatModel.findOne({ user: userId });
          //! Receiver
          const msgToSendUser = await ChatModel.findOne({
            user: msgSendToUserId,
          });

          const newMsg = {
            sender: userId,
            receiver: msgSendToUserId,
            msg,
            date: Date.now(),
          };

          const previousChat = user.chats.find(
            (chat) => chat.messagesWith.toString() === msgSendToUserId
          );

          if (previousChat) {
            previousChat.messages.push(newMsg);
            await user.save();
          } else {
            const newChat = {
              messagesWith: msgSendToUserId,
              messages: [newMsg],
            };
            user.chats.unshift(newChat);
            await user.save();
          }

          const previousChatForReceiver = msgToSendUser.chats.find(
            (chat) => chat.messagesWith.toString() === userId
          );

          if (previousChatForReceiver) {
            previousChatForReceiver.messages.push(newMsg);
            await msgToSendUser.save();
          } else {
            const newChat = { messagesWith: userId, messages: [newMsg] };
            msgToSendUser.chats.unshift(newChat);
            await msgToSendUser.save();
          }

          const receiverSocket = findConnectedUser(msgSendToUserId);

          if (receiverSocket) 
            io.to(receiverSocket.socketId).emit("newMsgReceived", {
              newMsg,
            })
            else{
              const user = await UserModel.findById(userId);
              if(!user.unreadMessage) {
                user.unreadMessage = true;
                await user.save()
              }
            }
          socket.emit("msgSent", { newMsg });
        } catch (error) {
          console.log(error);
        }
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

      socket.on("disconnect", () => removeUser(socket.id));

      socket.on("deleteMsg", async ({ userId, messagesWith, messageId }) => {
        const user = await ChatModel.findOne({ user: userId });
        const chat = user.chats.find(
          (chat) => chat.messagesWith.toString() === messagesWith
        );

        if (!chat) return;

        const messageToDelete = chat.messages.find(
          (message) => message._id.toString() === messageId
        );

        if (!messageToDelete) return;

        if (messageToDelete.sender.toString() !== userId) return;

        const indexOf = chat.messages.findIndex(
          (message) => message._id.toString() === messageToDelete._id.toString()
        );

        await chat.messages.splice(indexOf, 1);
        await user.save();

        socket.emit("msgDeleted", { messageId });
      });
    });
  }
  res.end();
};

export default SocketHandler;
