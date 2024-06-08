import sendRequest from "./send-request";

const QUALIFICATION_URL = "/api/qualification";

export function fetchAllQualifications() {
	return sendRequest(QUALIFICATION_URL, "GET");
}

export function fetchOneQualification(q_id) {
	return sendRequest(`${QUALIFICATION_URL}/${q_id}`, "GET");
}

export function addQualification(data) {
	return sendRequest(QUALIFICATION_URL, "POST", data);
}

export function editQualification(q_id, data) {
	return sendRequest(`${QUALIFICATION_URL}/${q_id}`, "PUT", data);
}
