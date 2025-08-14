import axios from "axios";
import { API_URL } from "../config";

export const translationAPI = axios.create({
	baseURL: API_URL,
});
