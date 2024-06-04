import sendRequest from "./send-request";

const AUTHORISATION_URL = "/api/authorisation";

export function fetchAllQualifications() {
	return sendRequest(`${AUTHORISATION_URL}/qualifications`, "GET");
}
