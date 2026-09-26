import type {
	InvestigatorImage,
	InvestigatorSignature,
	InvestigatorSkin,
} from "arkham-investigator-data";
import { getSignatureOptionName } from "./getSignatureOptionName";

const isCompleteImage = (
	image: InvestigatorSignature["image"],
): image is InvestigatorImage & { id: string } => {
	type Key = keyof InvestigatorImage;
	const keys: Key[] = ["id", "face", "width", "height"];
	return keys.every((key) => key in image);
};

export const createSkinFromSignature = (
	signature: InvestigatorSignature,
): InvestigatorSkin | undefined => {
	if (!isCompleteImage(signature.image)) {
		return;
	}
	return {
		id: signature.id,
		name: getSignatureOptionName(signature),
		image: signature.image,
	};
};
