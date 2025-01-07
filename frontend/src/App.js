import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

// creates a user socket + connects to server using URL and port
const socket = io("http://localhost:3000");

function App() {
  // sets state of the document
  const [text, setText] = useState("");

  // when client recevies the broadcast emit from server
  // indicating an update, useEffect resets the textarea with the update
  useEffect(() => {
    socket.on("update", (data) => {
      setText(data);
    });
  }, []);

  // takes a value from the client and transmits back to server
  const handleUpdate = (event) => {
    const value = event.target.value;
    setText(value);
    socket.emit("edit", value);
  };

  return (
    <textarea
      value={text}
      onChange={handleUpdate}
      rows="20"
      cols="50"
      placeholder="Start collaborating..."
    />
  );
}

export default App;
