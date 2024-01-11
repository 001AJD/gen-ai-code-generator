import axios from "axios";
import { config } from "dotenv";
config();

const generateCode = (message) => {
	console.log("user query =>" + message);

	const API_URL = process.env.BISON_API;
	const TOKEN = process.env.TOKEN;
	const postBody = {
		instances: [{ prefix: message }],
		parameters: {
			temperature: 0.0,
			maxOutputTokens: 100,
			candidateCount: 1,
		},
	};
	const headers = {
		headers: {
			"Content-Type": "application/json",
			Authorization: TOKEN,
		},
	};

	console.log(API_URL);
	console.log(TOKEN);

	return new Promise((resolve, reject) => {
		axios
			.post(API_URL, postBody, headers)
			.then((response) => {
				console.log("Response from BISON gen ai");
				console.log(JSON.stringify(response.data));
				if (response.status === 200) {
					resolve(
						response.data.predictions[0].content.replace(
							/\n/g,
							"<br>"
						)
					);
				} else {
					reject("Error occured");
				}
			})
			.catch((err) => {
				console.error("Error Occured");
				console.error(err);
				console.error(err.stack);
				reject(err);
			});
	});
};

export { generateCode };
