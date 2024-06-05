import sendRequest from "./send-request";

const AUTHORISATION_URL = "/api/authorisation";

export function fetchAllQualifications() {
	return sendRequest(`${AUTHORISATION_URL}/qualifications`, "GET");
}

export const fetchOneAuthorisationRecord = async (athId) => {
	return sendRequest(`${AUTHORISATION_URL}/${athId}`, "GET");
};

export function addAuthorisation(data) {
	return sendRequest(`${AUTHORISATION_URL}`, "POST", data);
}

export function editAuthorisation(athId, data) {
	return sendRequest(`${AUTHORISATION_URL}/${athId}`, "PUT", data);
}

export const signRecord = async (athId, user) => {
	return sendRequest(`${AUTHORISATION_URL}/sign`, "PATCH", athId, user);
};
