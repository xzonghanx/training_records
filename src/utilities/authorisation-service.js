import * as authorisationAPI from "./authorisation-api";

export const fetchAllQualifications = async () => {
	return await authorisationAPI.fetchAllQualifications();
};

export const addAuthorisation = async (personId, data) => {
	return await authorisationAPI.addAuthorisation(personId, data);
};
