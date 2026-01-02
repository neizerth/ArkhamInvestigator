import CryptoJS from "crypto-js";
import { CRYPTO_KEY } from "../../../config";

export const decryptText = (text: string) => {
	const bytes = CryptoJS.AES.decrypt(text, CRYPTO_KEY);
	return bytes.toString(CryptoJS.enc.Utf8);
};
