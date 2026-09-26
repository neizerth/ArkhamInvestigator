import type { InvestigatorSignatureGroup } from "arkham-investigator-data";
import { withSignatureGroupChapter } from "./withSignatureGroupChapter";

type Options = {
	signatureGroups: InvestigatorSignatureGroup[];
	chapter: number;
};

export const excludeSignatureGroupsByChapter = ({
	signatureGroups,
	chapter,
}: Options) => {
	const hasGroupChapter = (group: InvestigatorSignatureGroup) => {
		return group.signatures.some((signature) => signature.chapter === chapter);
	};

	return signatureGroups
		.filter(hasGroupChapter)
		.map(withSignatureGroupChapter(chapter))
		.filter(({ signatures }) => signatures.length > 0);
};
