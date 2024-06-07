import sendRequest from "./send-request";

const PERSONNEL_URL = "/api/personnel";

export function fetchAllPersonnel() {
	return sendRequest(PERSONNEL_URL, "GET");
}
export function fetchSearchedPersonnel(query) {
	return sendRequest(`${PERSONNEL_URL}/search?search=${query}`, "GET");
}

export function fetchOnePersonnel(personId) {
	return sendRequest(`${PERSONNEL_URL}/${personId}`, "GET");
}

export function addPerson(data) {
	return sendRequest(PERSONNEL_URL, "POST", data);
}

export function editPerson(data, personId) {
	return sendRequest(`${PERSONNEL_URL}/${personId}`, "PUT", data);
}

export function deleteOnePerson(personId) {
	return sendRequest(`${PERSONNEL_URL}/${personId}`, "DELETE");
}

export function deleteManyPersonnel(data) {
	return sendRequest(PERSONNEL_URL, "DELETE", data);
}
