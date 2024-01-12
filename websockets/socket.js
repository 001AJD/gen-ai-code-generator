import { randomUUID } from "crypto";

import { generateCode } from "../lib/generateCode.js";

const registerSocketEventHandlers = (wss) => {
	// handle connection event
	wss.on("connection", (socket) => {
		socket.clientId = randomUUID();
		console.log(
			"Received websocket connection from client id => " + socket.clientId
		);

		// handle message received from the client event
		socket.on("message", async (message) => {
			let response = "";
			console.log("message received from the client");
			try {
				// let result = await generateCode(message.toString());
				let result = "op from gen ai";
				response = result;
			} catch (err) {
				response = { error: "Internal Error Occured" };
			}
			console.log(
				"sending response to the client id => " + socket.clientId
			);

			socket.send(response);
			
		});

		// handle connection close event
		socket.on("close", () => {
			console.log("websocket connection closed");
		});
	});
};

export { registerSocketEventHandlers };
