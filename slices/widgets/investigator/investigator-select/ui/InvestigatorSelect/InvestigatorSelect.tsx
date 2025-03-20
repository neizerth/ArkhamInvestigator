import { useAppTranslation } from "@features/i18n";
import { changeSelectedInvestigator } from "@shared/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib/hooks";
import type { InvestigatorDetails } from "@shared/model";
import { propEq } from "ramda";
import { useCallback } from "react";
import { selectAvailableInvestigators } from "../../lib/store";
import { InvestigatorList as List } from "../InvestigatorList";
import * as C from "./InvestigatorSelect.components";

export const InvestigatorSelect = () => {
	const data = useAppSelector(selectAvailableInvestigators);
	const { t } = useAppTranslation();
	const dispatch = useAppDispatch();

	const onChange = useCallback(
		(item: InvestigatorDetails) => dispatch(changeSelectedInvestigator(item)),
		[dispatch],
	);

	const official = data.filter(propEq(true, "isOfficial"));
	const fanMade = data.filter(propEq(false, "isOfficial"));

	const title = t`Fan-made Investigators`;

	return (
		<C.Container>
			<C.Content>
				<List data={official} onChange={onChange} />
				<C.Separator>— {title} —</C.Separator>
				<List data={fanMade} onChange={onChange} />
			</C.Content>
			<C.Footer />
		</C.Container>
	);
};
