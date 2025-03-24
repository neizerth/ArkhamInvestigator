import { useAppTranslation } from "@features/i18n";
import { changeSelectedInvestigator, selectFactionFilter } from "@shared/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib/hooks";
import type { InvestigatorDetails } from "@shared/model";
import { propEq } from "ramda";
import { useCallback } from "react";
import { selectAvailableInvestigators } from "../../lib/store";
import { InvestigatorList as List } from "../InvestigatorList";
import * as C from "./InvestigatorSelect.components";

export const InvestigatorSelect = () => {
	const dispatch = useAppDispatch();
	const factionFilter = useAppSelector(selectFactionFilter);
	const data = useAppSelector(selectAvailableInvestigators);
	const { t } = useAppTranslation();

	const onChange = useCallback(
		(item: InvestigatorDetails) => dispatch(changeSelectedInvestigator(item)),
		[dispatch],
	);

	const filtered = factionFilter
		? data.filter(
				({ investigator }) => investigator.faction_code === factionFilter,
			)
		: data;

	const official = filtered.filter(propEq(true, "isOfficial"));
	const fanMade = filtered.filter(propEq(false, "isOfficial"));

	return (
		<C.Container>
			<C.FactionSelect />
			<C.Content>
				<List data={official} onChange={onChange} />
				<C.Separator>— {t`Fan-made Investigators`} —</C.Separator>
				<List data={fanMade} onChange={onChange} />
			</C.Content>
			<C.Footer />
		</C.Container>
	);
};
