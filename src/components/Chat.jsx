import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    console.log(chat.data.messages);

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
      };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    // As soon as the page loads, the socket connection is made and joinChat event is emitted
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    // listen to the message sent by the server
    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      console.log(firstName + " :  " + text);
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
    });

    // when the component unmounts
    return () => {
      socket.disconnect();
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

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Chat Container - shadcn card structure */}
        <div className="rounded-lg border border-[#3f3f46] bg-[#18181b] shadow-lg overflow-hidden h-[80vh] flex flex-col mt-16">
          {/* Chat Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#3f3f46]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#6366f1] flex items-center justify-center">
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
                <h2 className="text-lg font-semibold text-[#fafafa]">Chat</h2>
                <p className="text-sm text-[#71717a]">
                  Send messages instantly
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#27272a] text-xs text-[#a1a1aa]">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Online
              </span>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#0a0a0a]/50">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 rounded-full bg-[#27272a] flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-[#71717a]"
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
                <p className="text-[#a1a1aa]">No messages yet</p>
                <p className="text-sm text-[#71717a]">
                  Start the conversation!
                </p>
              </div>
            ) : (
              messages.map((msg, index) => {
                const isCurrentUser = user.firstName === msg.firstName;
                return (
                  <div
                    key={index}
                    className={`flex ${
                      isCurrentUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex flex-col ${
                        isCurrentUser ? "items-end" : "items-start"
                      } max-w-[70%]`}
                    >
                      {/* Message Header */}
                      <div
                        className={`flex items-center gap-2 mb-1 ${
                          isCurrentUser ? "flex-row-reverse" : ""
                        }`}
                      >
                        <span className="text-xs font-medium text-[#a1a1aa]">
                          {`${msg.firstName} ${msg.lastName}`}
                        </span>
                        <span className="text-xs text-[#71717a]">
                          2 hours ago
                        </span>
                      </div>

                      {/* Message Bubble */}
                      <div
                        className={`rounded-lg px-4 py-2 ${
                          isCurrentUser
                            ? "bg-[#6366f1] text-white"
                            : "bg-[#27272a] text-[#fafafa] border border-[#3f3f46]"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                      </div>

                      {/* Message Footer */}
                      <span className="text-xs text-[#71717a] mt-1">
                        {isCurrentUser ? "Sent" : "Received"}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Message Input - shadcn style */}
          <div className="flex items-center gap-3 px-6 py-4 border-t border-[#3f3f46] bg-[#18181b]">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
              className="flex-1 h-10 rounded-md border border-[#3f3f46] bg-[#27272a] px-3 py-2 text-sm text-[#fafafa] placeholder:text-[#71717a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366f1] transition-colors"
            />
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366f1] disabled:pointer-events-none disabled:opacity-50 bg-[#6366f1] text-white hover:bg-[#6366f1]/90 h-10 px-6"
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
