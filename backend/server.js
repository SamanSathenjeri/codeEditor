import { Server } from "socket.io";
import express from "express";
import https from "https";
import http from "http";
import fs from "fs";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// import cors from "cors";

import { connectAuthDB } from "./db/connectAuthDB.js";
import authRoutes from "./routes/auth.route.js";

// https://www.youtube.com/watch?v=ZKEqqIO7n-k&t=112s -- This
// https://www.smashingmagazine.com/2022/01/building-web-code-editor/
// https://www.youtube.com/watch?v=pmvEgZC55Cg -- This is for auth
// https://www.youtube.com/watch?v=ey1Bi6lI0Gg -- This is for room/namespaces & importing code mirror
// https://www.youtube.com/watch?v=Tg4_Zyyx-QA -- This is for upload/download

// creates a new express app
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cookieParser())
app.use("/auth", authRoutes);
// app.use('/projects', projectRoutes);

// creates a server on machine with express app instance
const server = http.createServer(app);
// set up https server when SSL certificates are gotten
// const httpsServer = createServer({
//     key: fs.readFileSync(),
//     cert: fs.readFileSync()
// })

// configures websocket to server and cors functionality
const io = new Server(server, { cors: { origin: "*" } });
// const io = new Server(httpsServer, {})

// server listens for new connections at port 3000
server.listen(PORT, () => {
  console.log("Server is running on http://localhost:3000");
  connectAuthDB();
});

// when a client connects to the server
io.on("connection", (socket) => {
  console.log("User connected");
  console.log(socket.id);

  // when there is an edit on any of the documents, the socket
  // receives an edit, and emits to all other users
  socket.on("edit", (data) => {
    // console.log("Edit received: ", data);
    // broadcast used to emit data to all users but yourself (to avoid duplicates)
    socket.broadcast.emit("update", data);
  });

  // simple check for disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
