import io from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
  return io(BASE_URL, {
    transports: ["websocket", "polling"],
    withCredentials: true,
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 10,
  });
};
