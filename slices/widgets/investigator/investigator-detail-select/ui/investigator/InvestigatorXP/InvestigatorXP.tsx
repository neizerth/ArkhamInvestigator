import { useAppTranslation } from "@features/i18n";
import {
	reduceInvestigatorSettings,
	safeDecrement,
	safeIncrement,
	selectCurrentSignatureGroup,
	selectInvestigatorSettingsProp,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import type { InvestigatorSignatureGroup } from "arkham-investigator-data";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./InvestigatorXP.components";

export type InvestigatorXPProps = ViewProps;

export const InvestigatorXP = ({ ...props }: InvestigatorXPProps) => {
	const dispatch = useAppDispatch();
	const { code } = useAppSelector(
		selectCurrentSignatureGroup,
	) as InvestigatorSignatureGroup;

	const xp = useAppSelector(selectInvestigatorSettingsProp(code, "xp", 0));

	const { t } = useAppTranslation();

	const onIncrement = useCallback(() => {
		dispatch(
			reduceInvestigatorSettings({
				code,
				prop: "xp",
				reducer: safeIncrement(),
			}),
		);
	}, [dispatch, code]);

	const onDecrement = useCallback(() => {
		dispatch(
			reduceInvestigatorSettings({
				code,
				prop: "xp",
				reducer: safeDecrement(0),
			}),
		);
	}, [dispatch, code]);

	return (
		<C.Container {...props}>
			<C.Title>{t`Experience points`}</C.Title>
			<C.Control onIncrement={onIncrement} onDecrement={onDecrement}>
				<C.Value>{xp}</C.Value>
			</C.Control>
		</C.Container>
	);
};
