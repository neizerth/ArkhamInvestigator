import {
	reduceInvestigatorSettings,
	selectCurrentSignatureGroup,
	selectInvestigatorSettingsProp,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { safeDecrement, safeIncrement } from "@shared/lib/util";
import type { InvestigatorSignatureGroup } from "arkham-investigator-data";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import type { ViewProps } from "react-native";
import * as C from "./InvestigatorXP.components";

export type InvestigatorXPProps = ViewProps;

export const InvestigatorXP = ({ ...props }: InvestigatorXPProps) => {
	const dispatch = useAppDispatch();
	const { code } = useAppSelector(
		selectCurrentSignatureGroup,
	) as InvestigatorSignatureGroup;

	const xp = useAppSelector(selectInvestigatorSettingsProp(code, "xp", 0));

	const { t } = useTranslation();

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
			<C.Title>{t`XP`}</C.Title>
			<C.Control onIncrement={onIncrement} onDecrement={onDecrement}>
				<C.Value>{xp}</C.Value>
			</C.Control>
		</C.Container>
	);
};
