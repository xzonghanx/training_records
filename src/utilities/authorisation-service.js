import * as authorisationAPI from "./authorisation-api";

export const fetchAllQualifications = async () => {
	return await authorisationAPI.fetchAllQualifications();
};

export const fetchOneAuthorisationRecord = async (athId) => {
	return await authorisationAPI.fetchOneAuthorisationRecord(athId);
};

export const addAuthorisation = async (data) => {
	return await authorisationAPI.addAuthorisation(data);
};

export const editAuthorisation = async (athId, data) => {
	return await authorisationAPI.editAuthorisation(athId, data);
};

export const signRecord = async (athId, user) => {
	return await authorisationAPI.signRecord(athId, user);
};
