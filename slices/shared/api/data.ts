import axios from "axios";
import { INVESTIGATORS_API_URL } from "../config";

export const dataAPI = axios.create({
	baseURL: INVESTIGATORS_API_URL,
});
