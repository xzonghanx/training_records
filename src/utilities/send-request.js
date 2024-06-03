import { getToken } from "./users-service";

export default async function sendRequest(url, method = "GET", payload = null) {
	// Fetch accepts an options object as the 2nd argument
	// used to include a data payload, set headers, etc.
	const options = { method };
	if (payload) {
		options.headers = { "Content-Type": "application/json" };
		options.body = JSON.stringify(payload);
	}

	const token = getToken();
	if (token) {
		options.headers = options.headers || {};
		options.headers.Authorization = `Bearer ${token}`;
	}

	try {
		const res = await fetch(url, options);
		if (res.ok) return res.json();
		//other status from server, 404/505 etc
		else {
			const errorMessage = `Request failed with status ${res.status} (${res.statusText}) for URL: ${url}`;
			throw new Error(errorMessage);
		}
		//other errors during fetch req, rejected promise (network issue/invalid JSON etc)
	} catch (error) {
		console.error("Error during fetch request:", error);
		throw error;
	}
}
