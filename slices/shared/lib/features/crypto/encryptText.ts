import CryptoJS from "crypto-js";
import { CRYPTO_KEY } from "../../../config";

export const encryptText = (text: string) => {
	return CryptoJS.AES.encrypt(text, CRYPTO_KEY).toString();
};
