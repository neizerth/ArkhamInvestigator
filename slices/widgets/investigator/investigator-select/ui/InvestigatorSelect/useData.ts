import type { FactionFilterType } from "@modules/faction/shared/model";
import { selectAvailableSignatureGroups } from "@modules/signature/base/shared/lib";
import { splitIntoGroups, useAppSelector } from "@shared/lib";
import { propEq } from "ramda";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

type Options = {
	faction: FactionFilterType;
	artworksEnabled: boolean;
	columns: number;
};

export const useData = (options: Options) => {
	const { faction, artworksEnabled } = options;
	const columns = artworksEnabled ? options.columns : 1;

	const signatureGroups = useAppSelector(selectAvailableSignatureGroups);
	const { t } = useTranslation();

	const filtered = signatureGroups.filter(({ spoiler, faction_code }) => {
		if (faction === "spoiler") {
			return spoiler === true;
		}
		return faction_code === faction && !spoiler;
	});

	const official = filtered.filter(propEq(true, "official"));
	const fanMade = filtered.filter(propEq(false, "official"));

	const officialGroups = splitIntoGroups(official, columns);
	const fanMadeGroups = splitIntoGroups(fanMade, columns);

	const fanMadeTitle = t`Fan-made Investigators`;

	return useMemo(() => {
		if (!artworksEnabled) {
			return [
				{
					data: fanMadeGroups,
				},
			];
		}

		return [
			{
				data: officialGroups,
			},
			{
				title: fanMadeTitle,
				data: fanMadeGroups,
			},
		];
	}, [artworksEnabled, fanMadeGroups, fanMadeTitle, officialGroups]);
};
