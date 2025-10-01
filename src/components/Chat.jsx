import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Socket } from "socket.io-client";
import { creaeteSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

// SVG Icons for display purposes
const SendIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
    {...props}
  >
    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
  </svg>
);

const Chat = () => {
  const { targetUserId } = useParams();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const sendMessage = () => {
    console.log(user);
    const socket = creaeteSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName : user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("")
  };

  useEffect(() => {
    if (!userId) return;
    const socket = creaeteSocketConnection();
    socket.emit("joinChat", { userId, targetUserId });

    socket.on("messageReceived", ({ firstName , lastName ,  text }) => {
      console.log(firstName + " " + text);
      setMessages((messages) => [...messages, { firstName ,  lastName, text }]);
    });
    return () => {
      socket.disconnect();
    };
  }, [targetUserId, userId]);

  return (
   <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => {
          return (
            <div
              key={index}
              className={
                (user.firstName === msg.firstName ? "chat-end" : "chat-start")
              }
            >
              <div className="chat-header">
                {`${msg.firstName} ${msg.lastName}`}
              </div>
              <div className="chat-bubble">{msg.text}</div>
            </div>
          );
        })}
      </div>
      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 text-white rounded p-2"
        ></input>
        <button onClick={sendMessage} className="btn btn-secondary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
