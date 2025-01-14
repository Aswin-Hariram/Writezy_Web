import React, { useState } from "react";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "User", text: input }]);
      setInput(""); // Clear input field
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: "Assistant", text: "This is a response from the assistant!" },
        ]);
      }, 1000);
    }
  };

  return (
    <div style={styles.container}>
      {/* Side Navigation Bar */}
      <div style={styles.sidebar}>
        <h3>Navigation</h3>
        <ul style={styles.navList}>
          <li style={styles.navItem}>Home</li>
          <li style={styles.navItem}>Settings</li>
          <li style={styles.navItem}>Profile</li>
          <li style={styles.navItem}>Help</li>
        </ul>
      </div>

      {/* Chat Interface */}
      <div style={styles.chatContainer}>
        <div style={styles.header}>
          <h2>Chat with Assistant</h2>
        </div>
        <div style={styles.chatWindow}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                ...styles.message,
                alignSelf: msg.sender === "User" ? "flex-end" : "flex-start",
                backgroundColor: msg.sender === "User" ? "#d1e7dd" : "#f8d7da",
              }}
            >
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          ))}
        </div>
        <div style={styles.inputContainer}>
          <input
            type="text"
            style={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
          />
          <button style={styles.sendButton} onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  sidebar: {
    width: "200px",
    backgroundColor: "#343a40",
    color: "#fff",
    padding: "20px",
    boxSizing: "border-box",
  },
  navList: {
    listStyle: "none",
    padding: 0,
  },
  navItem: {
    margin: "10px 0",
    cursor: "pointer",
  },
  chatContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    borderLeft: "1px solid #ccc",
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px",
    textAlign: "center",
  },
  chatWindow: {
    flex: 1,
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
  },
  message: {
    margin: "5px 0",
    padding: "10px",
    borderRadius: "10px",
    maxWidth: "70%",
  },
  inputContainer: {
    display: "flex",
    borderTop: "1px solid #ccc",
    padding: "10px",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginRight: "10px",
  },
  sendButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default App;
