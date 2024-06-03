import * as personnelAPI from "./personnel-api";

export const fetchAllPersonnel = async () => {
	return await personnelAPI.fetchAllPersonnel();
};

export const fetchOnePersonnel = async (personId) => {
	return await personnelAPI.fetchOnePersonnel(personId);
};
