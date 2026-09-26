import type {
	InvestigatorImage,
	InvestigatorSignature,
	InvestigatorSignatureGroup,
	InvestigatorSkin,
} from "arkham-investigator-data";
import { isNotNil, partition, uniqBy } from "ramda";
import { getSignatureOptionName } from "./getSignatureOptionName";

const isCompleteImage = (
	image: InvestigatorSignature["image"],
): image is InvestigatorImage & { id: string } => {
	type Key = keyof InvestigatorImage;
	const keys: Key[] = ["id", "face", "width", "height"];
	return keys.every((key) => key in image);
};

const toSkin = (
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

export const withSignatureGroupChapter =
	(chapter: number) =>
	(signatureGroup: InvestigatorSignatureGroup): InvestigatorSignatureGroup => {
		const hasChapter = (signature: InvestigatorSignature) => {
			return signature.chapter === chapter;
		};

		const [signatures, excluded] = partition(
			hasChapter,
			signatureGroup.signatures,
		);
		const excludedSkins = excluded.map(toSkin).filter(isNotNil);
		const [firstSignature] = signatures;
		const { id, code } = firstSignature;

		const skins = uniqBy(
			(skin) => skin.image.id,
			[...signatureGroup.skins, ...excludedSkins],
		);

		return {
			...signatureGroup,
			id,
			code,
			signatures,
			skins,
		};
	};
