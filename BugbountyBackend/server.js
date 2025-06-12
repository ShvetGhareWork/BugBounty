// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";
// import reportRoutes from "./routes/reportRoutes.js";
// import cors from "cors";

// dotenv.config();
// connectDB();

// const app = express();
// app.use(express.json());

// app.use(
//   cors({
//     origin: "http://localhost:3000", // allow only your frontend origin
//     methods: ["GET", "POST", "PUT", "DELETE"], // allowed methods
//     credentials: true, // if you use cookies/auth headers
//   })
// );

// const activeUsers = new Set();

// // On successful login
// function onUserLogin(userId) {
//   activeUsers.add(userId);
// }

// // On logout (or token expiry)
// function onUserLogout(userId) {
//   activeUsers.delete(userId);
// }

// // Endpoint to get active users
// app.get("/active-users", (req, res) => {
//   res.json(Array.from(activeUsers));
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/reports", reportRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import cors from "cors";
import http from "http";
// import { Server as SocketIO } from "socket.io";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "https://bug-bounty-frontend.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);

// Endpoint to get currently active users
app.get("/api/active-users", (req, res) => {
  res.json(Array.from(activeUsers));
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`Server and Socket.io running on port ${PORT}`)
);
