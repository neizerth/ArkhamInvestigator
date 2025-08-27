import {
	selectInvestigatorXPByCode,
	setInvestigatorSettingsProp,
} from "@modules/signature/base/shared/lib";
import {
	selectCurrentSignatureGroup,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
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

	const xp = useAppSelector(selectInvestigatorXPByCode(code));

	const { t } = useTranslation();

	const onIncrement = useCallback(() => {
		dispatch(
			setInvestigatorSettingsProp({
				code,
				prop: "xp",
				value: xp + 1,
			}),
		);
	}, [dispatch, code, xp]);

	const onDecrement = useCallback(() => {
		dispatch(
			setInvestigatorSettingsProp({
				code,
				prop: "xp",
				value: Math.max(xp - 1, 0),
			}),
		);
	}, [dispatch, code, xp]);

	return (
		<C.Container {...props}>
			<C.Title>{t`XP`}</C.Title>
			<C.Control onIncrement={onIncrement} onDecrement={onDecrement}>
				<C.Value>{xp}</C.Value>
			</C.Control>
		</C.Container>
	);
};
