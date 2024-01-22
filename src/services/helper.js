import Swal from "sweetalert2";
import router from "@/router";
import axios from "axios";
import Unidecode from "unidecode";

const BASE_URL = import.meta.env.VITE_API_URL;

export const requestWithToken = async (url, method, data) => {
	// debugger;
	const token = localStorage.getItem("token");
	if (token !== undefined || token !== "" || token !== null) {
		const headers = {
			headers: {
				Authorization: "Bearer " + token,
			},
		};
		let response = null;

		const endpoint = BASE_URL + url;
		// axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

		switch (method.toLowerCase()) {
			case "get":
				response = await axios.get(endpoint, headers);
				break;
			case "post":
				response = await axios.post(endpoint, data, headers);
				break;
			case "put":
				response = await axios.put(endpoint, data, headers);
				break;
			case "delete":
				response = await axios.delete(endpoint, headers);
				break;
			default:
				break;
		}
		return response;
	}
	return false;
};
export const request = async (url, method, data) => {
	const headers = {};
	let response = null;

	const endpoint = BASE_URL + url;
	switch (method.toLowerCase()) {
		case "get":
			response = await axios.get(endpoint, headers);
			break;
		case "post":
			response = await axios.post(endpoint, data, headers);
			break;
		case "put":
			response = await axios.put(endpoint, data, headers);
			break;
		case "delete":
			response = await axios.delete(endpoint, headers);
			break;
		default:
			break;
	}
	return response;
};
export const generateSlug = (name) => {
	if (!name) {
		return ""; // Return a default value if name is not provided
	}
	const withoutDiacritics = Unidecode(name);

	return withoutDiacritics.toLowerCase().replace(/[^a-zA-Z0-9-]+/g, "-");
};
