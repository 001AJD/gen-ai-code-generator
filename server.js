import express from "express";
import { WebSocketServer } from "ws";
import { generateCode } from "./lib/generateCode.js";

const app = express();
const wss = new WebSocketServer({ port: 8080 });

app.use(express.static("public"));

// handle connection event
wss.on("connection", (socket) => {
	console.log("websocket received a connection");

	// handle open connection event
	socket.on("open", () => {
		console.log("websocket connection opened");
	});

	// handle message received from the client event
	socket.on("message", async (message) => {
		let response = "";
		console.log("message received from the client");
		try {
			let result = await generateCode(message.toString());
			response = result;
			console.log;
		} catch (err) {
			response = { error: "Internal Error Occured" };
		}
		console.log("sending response to the client");
		wss.clients.forEach((client) => {
			client.send(response);
		});
	});

	// handle connection close event
	socket.on("close", () => {
		console.log("websocket connection closed");
	});
});

const server = app.listen(3000, () => {
	console.log("server listening on port 3000");
});

server.on("upgrade", (request, socket, head) => {
	wss.handleUpgrade(request, socket, head, (socket) => {
		wss.emit("connection", socket, request);
	});
});
