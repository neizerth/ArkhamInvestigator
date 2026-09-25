import { excludeSignatureGroupsByChapter as excludeByChapter } from "@modules/signature/base/shared/lib";
import { splitIntoGroups } from "@shared/lib/util/collections";
import type { FactionFilterType } from "@shared/model";
import type { InvestigatorSignatureGroup } from "arkham-investigator-data";
import { propEq } from "ramda";
import { compact } from "ramda-adjunct";

type Options = {
	signatureGroups: InvestigatorSignatureGroup[];
	artworksEnabled: boolean;
	faction: FactionFilterType;
	columns: number;
};
export const getSignatureSections = ({
	signatureGroups,
	artworksEnabled,
	faction,
	columns,
}: Options) => {
	const filtered = signatureGroups.filter(({ spoiler, faction_code }) => {
		if (faction === "spoiler") {
			return spoiler === true;
		}
		return faction_code === faction && !spoiler;
	});

	const toGroups = (data: InvestigatorSignatureGroup[]) =>
		splitIntoGroups(data, columns);

	const fanMade = filtered.filter(propEq(false, "official"));

	const fanMadeSection = {
		title: "Fan-made Investigators",
		data: toGroups(fanMade),
	};

	if (!artworksEnabled) {
		return [fanMadeSection];
	}

	const official = filtered.filter(propEq(true, "official"));

	const chapter1 = excludeByChapter({
		signatureGroups: official,
		chapter: 1,
	});

	const chapter2 = excludeByChapter({
		signatureGroups: official,
		chapter: 2,
	});

	const showChapter1Title = chapter2.length > 0;

	return compact([
		chapter2.length > 0 && {
			data: toGroups(chapter2),
		},
		{
			...(showChapter1Title && { title: "Chapter 1" }),
			data: toGroups(chapter1),
		},
		fanMadeSection,
	]);
};
