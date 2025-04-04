import { useAppTranslation } from "@features/i18n";
import { changeSelectedInvestigator, splitIntoGroups } from "@shared/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib/hooks";
import type { InvestigatorDetails } from "@shared/model";
import { propEq } from "ramda";
import { useCallback } from "react";
import {
	selectAvailableInvestigators,
	selectCurrentFactionFilter,
	useColumnsCount,
} from "../../lib";
import { InvestigatorList as List } from "../investigator-list/InvestigatorList";
import * as C from "./InvestigatorSelect.components";

export const InvestigatorSelect = () => {
	const dispatch = useAppDispatch();
	const factionFilter = useAppSelector(selectCurrentFactionFilter);
	const data = useAppSelector(selectAvailableInvestigators);
	const { t } = useAppTranslation();
	const columns = useColumnsCount();

	const onChange = useCallback(
		(item: InvestigatorDetails) => dispatch(changeSelectedInvestigator(item)),
		[dispatch],
	);

	const filtered = data.filter(({ investigator, media }) => {
		if (factionFilter === "spoiler") {
			return media?.spoiler === true;
		}
		return investigator.faction_code === factionFilter && !media?.spoiler;
	});

	const official = filtered.filter(propEq(true, "isOfficial"));
	const fanMade = filtered.filter(propEq(false, "isOfficial"));

	const sections = [
		{
			data: splitIntoGroups(official, columns),
		},
		{
			title: t`Fan-made Investigators`,
			data: splitIntoGroups(fanMade, columns),
		},
	];

	return (
		<C.Container>
			<C.FactionSelect />
			<C.Content>
				<List sections={sections} onChange={onChange} />
			</C.Content>
			<C.Footer />
		</C.Container>
	);
};
