import { GrayscaleModule } from "@expo-modules/grayscale";

const errorMessage =
	"Could not convert to grayscale. Please check if input image format is valid.";

export default async function getBase64Grayscale(
	base64: string,
): Promise<string> {
	try {
		const result = await GrayscaleModule.toGrayscale(base64);

		if (!result.base64) {
			throw new Error(errorMessage);
		}

		// Remove line breaks from the output
		const output = result.base64.replace(/(\r\n|\n|\r)/gm, "");
		return output;
	} catch (error) {
		throw new Error(errorMessage);
	}
}
