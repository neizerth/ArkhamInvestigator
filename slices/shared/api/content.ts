import axios from "axios";
import { API_URL } from "../config";

export const contentAPI = axios.create({
	baseURL: API_URL,
});
