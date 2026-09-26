import type {
	InvestigatorSignature,
	InvestigatorSignatureGroup,
} from "arkham-investigator-data";
import { isNotNil, partition, uniqBy } from "ramda";
import { createSkinFromSignature } from "./createSkinFromSignature";

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
		const excludedSkins = excluded
			.map(createSkinFromSignature)
			.filter(isNotNil);
		const [firstSignature] = signatures;
		const { id, code } = firstSignature;

		const mergedSkins = [...signatureGroup.skins, ...excludedSkins];
		const skins = uniqBy((skin) => skin.image.id, mergedSkins);

		return {
			...signatureGroup,
			id,
			code,
			signatures,
			skins,
		};
	};
