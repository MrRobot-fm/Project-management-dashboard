import express from "express";
import { errorMiddleware } from "@/middlewares/errors";
import { rootRouter } from "@/routes/root";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

export const app = express();
const PORT = process.env.PORT;

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

app.use(cookieParser());

app.use(cors({ origin: process.env.CLIENT_URL }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", rootRouter);
app.use(errorMiddleware);

io.on("connection", (socket) => {
  console.log(`User connected with id: ${socket.id}`);

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
    console.log(data);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
