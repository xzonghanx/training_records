import sendRequest from "./send-request";

export const addExcel = async (data) => {
	return await sendRequest("/api/excel", "POST", data);
};
