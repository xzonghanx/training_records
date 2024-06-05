import * as usersAPI from "./users-api";

import debug from "debug";
const log = debug("pern:utilities:users-service");

export function getToken() {
	const token = localStorage.getItem("token");
	if (!token) return null;
	const payload = JSON.parse(atob(token.split(".")[1]));
	if (payload.exp < Date.now() / 1000) {
		localStorage.removeItem("token");
		return null;
	}
	return token;
}

export function getUser() {
	const token = getToken();
	return token ? JSON.parse(atob(token.split(".")[1])).user : null;
}

export const signUp = async (userData) => {
	log("userData: %o", userData);
	const signedUp = await usersAPI.signUp(userData);
	log("signedUp: %o", signedUp);
	return signedUp;

	// const token = await usersAPI.signUp(userData);
	// log("token: %o", token);
	// localStorage.setItem("token", token);
	// return getUser();
};

export const logOut = () => {
	localStorage.removeItem("token");
};

export const login = async (email, password) => {
	log("%s, %s", email, password);
	const user = { email, password };

	const token = await usersAPI.login(user);
	log("token: %o", token);
	localStorage.setItem("token", token);
	return getUser();
};

export const checkToken = async () => {
	const dateStr = await usersAPI.checkToken();
	return new Date(dateStr);
};

export const fetchUsers = async () => {
	return await usersAPI.fetchUsers();
};

export const fetchFilterOptions = async () => {
	return await usersAPI.fetchFilterOptions();
};
