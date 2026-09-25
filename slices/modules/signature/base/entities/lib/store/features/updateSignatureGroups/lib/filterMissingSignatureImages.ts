import { getSignatureImageUrl } from "@modules/signature/base/shared/api";
import * as FileSystem from "expo-file-system";
import type { SignatureImageFile } from "./getSignatureImageFiles";

const exists = async (file: SignatureImageFile) => {
	const uri = getSignatureImageUrl({
		...file,
		pathType: "storage",
	});
	const info = await FileSystem.getInfoAsync(uri);

	return info.exists;
};

export const filterMissingSignatureImages = async (
	files: SignatureImageFile[],
) => {
	const found = await Promise.all(files.map(exists));

	return files.filter((_, index) => !found[index]);
};
