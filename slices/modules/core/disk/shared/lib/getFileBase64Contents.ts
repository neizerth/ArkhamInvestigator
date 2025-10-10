import * as FileSystem from "expo-file-system";
import mime from "mime";

export const getFileBase64Contents = async (
	path: string,
	includeMime = true,
) => {
	const contents = await FileSystem.readAsStringAsync(path, {
		encoding: FileSystem.EncodingType.Base64,
	});
	if (!includeMime) {
		return contents;
	}
	const mimeType = mime.getType(path);
	if (!mimeType) {
		throw new Error("Invalid mime type");
	}
	return `data:${mimeType};base64,${contents}`;
};
