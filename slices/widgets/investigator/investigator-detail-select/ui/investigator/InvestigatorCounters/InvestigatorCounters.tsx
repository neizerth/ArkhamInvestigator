import {
	selectInvestigatorCounters,
	toggleInvestigatorCounter,
} from "@modules/signature/shared/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import type { InvestigatorAbility } from "arkham-investigator-data";
import memoize from "fast-memoize";
import { propEq } from "ramda";
import { useTranslation } from "react-i18next";
import type { ViewProps } from "react-native";
import { selectCurrentSignature } from "../../../lib";
import * as C from "./InvestigatorCounters.components";

export type InvestigatorCountersProps = ViewProps;
export const InvestigatorCounters = (props: InvestigatorCountersProps) => {
	const dispatch = useAppDispatch();

	const investigator = useAppSelector(selectCurrentSignature);
	const code = investigator?.code || "";
	const counterEnabled = useAppSelector(selectInvestigatorCounters(code));

	const { t } = useTranslation();
	const abilities = investigator?.abilities ?? [];
	const counters = abilities.filter(propEq("counter", "type"));

	const onAbilityPress = memoize((ability: InvestigatorAbility) => () => {
		if (!code) {
			return;
		}
		dispatch(
			toggleInvestigatorCounter({
				abilityId: ability.id,
				code,
			}),
		);
	});
	if (counters.length === 0) {
		return null;
	}

	return (
		<C.Container {...props}>
			{counters.map(
				(ability) =>
					ability.type === "counter" && (
						<C.Check
							key={ability.id}
							label={t(ability.name)}
							onPress={onAbilityPress(ability)}
							checked={counterEnabled[ability.id]}
						/>
					),
			)}
		</C.Container>
	);
};
