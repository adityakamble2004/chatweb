// Public WebSocket server URL (real-time server)
const WEBSOCKET_URL = "wss://realtime.playground.socket.io";

const messagesDiv = document.getElementById("messages");
const input = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

// Initialize WebSocket connection
const socket = new WebSocket(WEBSOCKET_URL);

// Handle WebSocket connection open
socket.onopen = () => {
  console.log("Connected to WebSocket server!");
};

// Handle incoming messages
socket.onmessage = (event) => {
  const message = event.data;

  // Display received message
  const messageElement = document.createElement("div");
  messageElement.className = "message received";
  messageElement.textContent = message;
  messagesDiv.appendChild(messageElement);

  // Scroll to the latest message
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
};

// Handle WebSocket connection errors
socket.onerror = (error) => {
  console.error("WebSocket error:", error);
  alert("Unable to connect to WebSocket server!");
};

// Send a message
function sendMessage() {
  const message = input.value.trim();

  if (message) {
    // Send message to the WebSocket server
    socket.send(message);

    // Display the sent message
    const messageElement = document.createElement("div");
    messageElement.className = "message sent";
    messageElement.textContent = message;
    messagesDiv.appendChild(messageElement);

    // Clear input field and scroll to the latest message
    input.value = "";
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
}

// Add click event to the send button
sendButton.addEventListener("click", sendMessage);

// Send message on pressing Enter
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});
