import sendRequest from "./send-request";

const BASE_URL = "/api/users";

export function signUp(userData) {
	return sendRequest(BASE_URL, "POST", userData);
}

export function login(credentials) {
	return sendRequest(`${BASE_URL}/login`, "POST", credentials);
}

export function checkToken() {
	return sendRequest(`${BASE_URL}/check-token`);
}

export function fetchUsers() {
	return sendRequest(BASE_URL, "GET");
}

export function fetchFilterOptions() {
	return sendRequest(`${BASE_URL}/filters`, "GET");
}
