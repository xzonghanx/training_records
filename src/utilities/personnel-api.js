import sendRequest from "./send-request";

const PERSONNEL_URL = "/api/personnel";

export function fetchAllPersonnel() {
	return sendRequest(PERSONNEL_URL, "GET");
}

export function fetchOnePersonnel(personId) {
	return sendRequest(`${PERSONNEL_URL}/${personId}`, "GET");
}
