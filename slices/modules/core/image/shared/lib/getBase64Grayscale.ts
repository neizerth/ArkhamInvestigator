import { NativeModules } from "react-native";

const { Grayscale } = NativeModules;

export default function getBase64Grayscale(base64: string): Promise<string> {
	return new Promise((resolve, reject) => {
		Grayscale.toGrayscale(base64, (encoded: string) => {
			if (!encoded) {
				reject(
					new Error(
						"Could not convert to grayscale. Please check if input image format is valid.",
					),
				);
				return;
			}
			const output = encoded.replace(/(\r\n|\n|\r)/gm, "");
			return resolve(output);
		});
	});
}
