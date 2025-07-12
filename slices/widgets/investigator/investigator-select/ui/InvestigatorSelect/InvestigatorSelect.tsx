import { useAppTranslation } from "@modules/core/i18n/shared/lib";
import {
	changeSelectedInvestigator,
	selectFactionFilter,
	selectSignatureGroups,
} from "@shared/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib/hooks";
import { splitIntoGroups } from "@shared/lib/util";
import type { InvestigatorSignatureGroup } from "arkham-investigator-data";
import { propEq } from "ramda";
import { useCallback } from "react";
import { useColumnsCount } from "../../lib";
import { InvestigatorList as List } from "../investigator-list/InvestigatorList";
import * as C from "./InvestigatorSelect.components";

export const InvestigatorSelect = () => {
	const dispatch = useAppDispatch();
	const factionFilterValue = useAppSelector(selectFactionFilter);
	const data = useAppSelector(selectSignatureGroups);
	const { t } = useAppTranslation();
	const columns = useColumnsCount();

	const onChange = useCallback(
		(item: InvestigatorSignatureGroup) =>
			dispatch(changeSelectedInvestigator(item)),
		[dispatch],
	);

	const factionFilter = factionFilterValue || "guardian";

	const filtered = data.filter(({ spoiler, faction_code }) => {
		if (factionFilter === "spoiler") {
			return spoiler === true;
		}
		return faction_code === factionFilter && !spoiler;
	});

	const official = filtered.filter(propEq(true, "official"));
	const fanMade = filtered.filter(propEq(false, "official"));

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
			<C.FactionSelect value={factionFilter} />
			<C.Content>
				<List sections={sections} onChange={onChange} />
			</C.Content>
			<C.Footer />
		</C.Container>
	);
};
