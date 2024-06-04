import * as personnelAPI from "./personnel-api";

export const fetchAllPersonnel = async () => {
	return await personnelAPI.fetchAllPersonnel();
};

export const fetchOnePersonnel = async (personId) => {
	return await personnelAPI.fetchOnePersonnel(personId);
};

export const addPerson = async (data) => {
	return await personnelAPI.addPerson(data);
};

export const editPerson = async (data, personId) => {
	return await personnelAPI.editPerson(data, personId);
};

export const deleteOnePerson = async (personId) => {
	return await personnelAPI.deleteOnePerson(personId);
};

export const deleteManyPersonnel = async (data) => {
	return await personnelAPI.deleteManyPersonnel(data);
};
