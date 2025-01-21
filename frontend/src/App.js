import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Editor } from "@monaco-editor/react";
import "./App.css";

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

    return () => socket.off("update");
  }, []);

  // takes a value from the client and transmits back to server
  const handleUpdate = (value) => {
    if (value !== undefined) { 
      setText(value);
      socket.emit("edit", value);
    }
  };

  return (
    <div className="App">
      <Editor
        height="600px"
        language="javascript"
        theme="vs-dark"
        value={text} // Bind the editor content to state
        onChange={handleUpdate} // Update state and server on changes
      />
    </div>
  );
}

export default App;
