import { Server as SocketIOServer } from "socket.io";
import { NextApiRequest, NextApiResponse } from "next";
import { Server as HTTPServer } from "http";

// Extend the NextApiResponse type to include the socket server
type NextApiResponseWithSocket = NextApiResponse & {
  socket: {
    server: HTTPServer & {
      io?: SocketIOServer;
    };
  };
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (!res.socket.server.io) {
    const io = new SocketIOServer(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      socket.on("draw", (data) => {
        socket.broadcast.emit("draw", data);
      });

      socket.on("addObject", (data) => {
        socket.broadcast.emit("addObject", data);
      });

      socket.on("removeObject", (data) => {
        socket.broadcast.emit("removeObject", data);
      });
    });
  }
  res.end();
}