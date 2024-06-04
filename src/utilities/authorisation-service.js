import * as authorisationAPI from "./authorisation-api";

export const fetchAllQualifications = async () => {
	return await authorisationAPI.fetchAllQualifications();
};
