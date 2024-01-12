import express from "express";
import { WebSocketServer } from "ws";
import { registerSocketEventHandlers } from "./websockets/socket.js";

const wss = new WebSocketServer({ port: 8080 });
const app = express();
registerSocketEventHandlers(wss);

app.use(express.static("public"));

const server = app.listen(3000, () => {
	console.log("server listening on port 3000");
});

server.on("upgrade", (request, socket, head) => {
	wss.handleUpgrade(request, socket, head, (socket) => {
		wss.emit("connection", socket, request);
	});
});
