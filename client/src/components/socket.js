// client/src/socket.js

let socket = null;

export function initSocket() {
  const WS_URL =
    process.env.NODE_ENV === "production"
      ? "wss://codezen2-server.onrender.com/ws"   // your Render backend
      : "ws://localhost:5000/ws";                // local backend

  socket = new WebSocket(WS_URL);

  socket.onopen = () => {
    console.log("WebSocket connected");
  };

  socket.onmessage = (event) => {
    console.log("Message from server:", event.data);
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  socket.onclose = () => {
    console.log("WebSocket disconnected");
  };

  return socket;
}

export function getSocket() {
  return socket;
}