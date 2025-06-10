import { useAppTranslation } from "@modules/core/i18n/shared/lib";
import {
	selectInvestigatorSettingsProp,
	setInvestigatorCounterEnabled as setCounterEnabled,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import type { InvestigatorAbility } from "arkham-investigator-data";
import memoize from "fast-memoize";
import { propEq } from "ramda";
import type { ViewProps } from "react-native";
import { selectCurrentSignature } from "../../../lib";
import * as C from "./InvestigatorCounters.components";

export type InvestigatorCountersProps = ViewProps;
export const InvestigatorCounters = (props: InvestigatorCountersProps) => {
	const dispatch = useAppDispatch();

	const investigator = useAppSelector(selectCurrentSignature);
	const code = investigator?.code || "";
	const counterEnabled =
		useAppSelector(selectInvestigatorSettingsProp(code, "counters")) || {};
	const { t } = useAppTranslation();
	const abilities = investigator?.abilities ?? [];
	const counters = abilities.filter(propEq("counter", "type"));

	const onAbilityPress = memoize((ability: InvestigatorAbility) => () => {
		if (!code) {
			return;
		}
		dispatch(
			setCounterEnabled({
				abilityId: ability.id,
				code,
				enabled: (value) => !value,
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
						<C.Checkbox
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
