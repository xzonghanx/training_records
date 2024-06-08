import * as qualificationAPI from "./qualification-api";

export const fetchAllQualifications = async () => {
	return await qualificationAPI.fetchAllQualifications();
};

export const fetchOneQualification = async (q_id) => {
	return await qualificationAPI.fetchOneQualification(q_id);
};

export const addQualification = async (data) => {
	return await qualificationAPI.addQualification(data);
};

export const editQualification = async (q_id, data) => {
	return await qualificationAPI.editQualification(q_id, data);
};
