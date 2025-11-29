import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [lastSeen, setLastSeen] = useState(null);
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "short",
    });
  };

  //  Ref for the scrollable chat container
  const messagesContainerRef = useRef(null);

  const fetchChatMessages = async () => {
    try {
      setLoadingMessages(true);

      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });

      const chatMessages = chat?.data?.chat?.messages.map((msg) => {
        const { senderId, text, createdAt } = msg;
        return {
          senderId: senderId?._id,
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text,
          createdAt,
        };
      });

      setMessages(chatMessages);
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingMessages(false);
    }
  };

  const fetchLastSeen = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/lastSeen/${targetUserId}`, {
        withCredentials: true,
      });
      console.log(res);
      setLastSeen(res.data.lastSeen);
    } catch (err) {
      console.log("Error fetching last seen:", err);
    }
  };

  useEffect(() => {
    fetchChatMessages();
    fetchLastSeen();
  }, []);

  //  Scroll only the chat container, not the page
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on(
      "messageReceived",
      ({ senderId, firstName, lastName, text, createdAt }) => {
        setMessages((messages) => [
          ...messages,
          { senderId, firstName, lastName, text, createdAt },
        ]);
      }
    );

    socket.on("lastSeenUpdate", (time) => {
      setLastSeen(time);
    });

    return () => {
      socket.disconnect();
      fetchLastSeen(); // update last seen after user leaves chat
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  const ChatShimmer = () => {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex gap-3">
            {/* Avatar */}
            <div className="w-8 h-8 bg-[#ff734d22] rounded-full"></div>

            {/* Message bubble */}
            <div className="flex-1">
              <div className="w-32 h-3 bg-[#ff734d22] rounded mb-2"></div>
              <div className="w-full h-10 bg-[#ff734d11] rounded-xl"></div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFE4D1] to-[#c26328] px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Chat Container */}
        <div
          className="
        rounded-2xl 
        border border-[#ff734d55]
        bg-white/80 backdrop-blur-xl 
        shadow-xl 
        overflow-hidden 
        h-[80vh] 
        flex flex-col 
        mt-16
      "
        >
          {/* Header */}
          <div
            className="
          flex items-center justify-between 
          px-6 py-4 
          border-b border-[#ff734d55] 
          bg-white/70 backdrop-blur
        "
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#ff734d] to-[#d64000] flex items-center justify-center shadow-md">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[#010D3E]">Chat</h2>
                <p className="text-sm text-[#00000088]">
                  Send messages instantly
                </p>
              </div>
            </div>

            <p className="text-xs text-[#00000088]">
              {lastSeen
                ? `Last seen: ${formatTime(lastSeen)}`
                : "Loading last seen..."}
            </p>
          </div>

          {/* Messages */}
          <div
            ref={messagesContainerRef}
            className="
            flex-1 overflow-y-auto 
            p-6 space-y-4 
            bg-[#FFF7F2]/50
            border-b border-[#ff734d33]
          "
          >
            {loadingMessages ? (
              <ChatShimmer />
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 rounded-full bg-[#ff734d11] flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-[#00000055]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <p className="text-[#00000099]">No messages yet</p>
                <p className="text-sm text-[#00000055]">
                  Start the conversation!
                </p>
              </div>
            ) : (
              messages.map((msg, index) => {
                const isMe = msg.senderId === userId;
                return (
                  <div
                    key={index}
                    className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex flex-col ${
                        isMe ? "items-end" : "items-start"
                      } max-w-[70%]`}
                    >
                      <div
                        className={`flex items-center gap-2 mb-1 ${
                          isMe ? "flex-row-reverse" : ""
                        }`}
                      >
                        <span className="text-xs font-medium text-[#00000088]">
                          {msg.firstName} {msg.lastName}
                        </span>
                        <span className="text-xs text-[#00000055]">
                          {formatTime(msg.createdAt)}
                        </span>
                      </div>

                      {/* Message bubble */}
                      <div
                        className={`
                        rounded-xl px-4 py-2 backdrop-blur 
                        ${
                          isMe
                            ? "bg-gradient-to-r from-[#ff734d] to-[#d64000] text-white shadow-md border border-[#ff734d55]"
                            : "bg-white/70 border border-[#ff734d55] text-[#010D3E]"
                        }
                      `}
                      >
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                      </div>

                      <span className="text-xs text-[#00000055] mt-1">
                        {isMe ? "Sent" : "Received"}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Input */}
          <div className="flex items-center gap-3 px-6 py-4 border-t border-[#ff734d55] bg-white/70 backdrop-blur">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
              className="
              flex-1 h-10 rounded-md 
              border border-[#ff734d55] 
              bg-white/80 px-3 py-2 
              text-sm text-[#010D3E] 
              placeholder:text-[#00000055]
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff734d]
            "
            />
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="
              inline-flex items-center justify-center 
              rounded-md text-sm font-medium 
              bg-gradient-to-r from-[#ff734d] to-[#d64000] text-white 
              h-10 px-6 shadow-md 
              disabled:opacity-50
              border border-[#ff734d55]
            "
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
