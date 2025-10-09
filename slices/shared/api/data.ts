import axios from "axios";
import { INVESTIGATORS_API_URL } from "../config";

console.log("INVESTIGATORS_API_URL", INVESTIGATORS_API_URL);

export const dataAPI = axios.create({
	baseURL: INVESTIGATORS_API_URL,
});
