import type {
	InvestigatorSignature,
	InvestigatorSignatureGroup,
} from "arkham-investigator-data";

type Options = {
	signatureGroups: InvestigatorSignatureGroup[];
	chapter: number;
};

export const excludeSignatureGroupsByChapter = ({
	signatureGroups,
	chapter,
}: Options) => {
	const hasGroupChapter = (group: InvestigatorSignatureGroup) => {
		return group.signatures.some(hasChapter);
	};
	const hasChapter = (signature: InvestigatorSignature) => {
		return signature.chapter === chapter;
	};

	return signatureGroups
		.filter(hasGroupChapter)
		.map((signatureGroup) => {
			const signatures = signatureGroup.signatures.filter(hasChapter);
			const [firstSignature] = signatures;

			return {
				...signatureGroup,
				id: firstSignature.id,
				signatures,
			};
		})
		.filter(({ signatures }) => signatures.length > 0);
};
