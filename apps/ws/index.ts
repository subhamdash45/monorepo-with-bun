import { prismaClient } from "db/client";

Bun.serve({
  port: 8086,
  fetch(req, server) {
    // upgrade the request to a WebSocket
    if (server.upgrade(req)) {
      return; // do not return a Response
    }
    return new Response("Upgrade failed", { status: 500 });
  },
  websocket: {
    message(ws: { send: (arg0: any) => void }, message: any) {
      prismaClient.user.create({
        data: {
          username: Math.random().toString(),
          password: Math.random().toString(),
        },
      });
      ws.send(message);
    },
  },
});
