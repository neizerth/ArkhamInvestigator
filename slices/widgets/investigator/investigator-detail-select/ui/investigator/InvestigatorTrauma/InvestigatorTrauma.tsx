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
import * as C from "./InvestigatorTrauma.components";

export type InvestigatorTraumaProps = ViewProps;

type TraumaProp = "physicalTrauma" | "mentalTrauma";

export const InvestigatorTrauma = (props: InvestigatorTraumaProps) => {
	const { t } = useAppTranslation();
	const dispatch = useAppDispatch();
	const group = useAppSelector(
		selectCurrentSignatureGroup,
	) as InvestigatorSignatureGroup;

	const physical =
		useAppSelector(
			selectInvestigatorSettingsProp(group.id, "physicalTrauma"),
		) || 0;

	const mental =
		useAppSelector(selectInvestigatorSettingsProp(group.id, "mentalTrauma")) ||
		0;

	const onIncrement = useCallback(
		(prop: TraumaProp) => () => {
			dispatch(
				reduceInvestigatorSettings({
					code: group.code,
					prop,
					reducer: safeIncrement(),
				}),
			);
		},
		[dispatch, group.code],
	);

	const onDecrement = useCallback(
		(prop: TraumaProp) => () => {
			dispatch(
				reduceInvestigatorSettings({
					code: group.code,
					prop,
					reducer: safeDecrement(0),
				}),
			);
		},
		[dispatch, group.code],
	);

	return (
		<C.Container {...props}>
			<C.Title>{t`Trauma`}</C.Title>
			<C.Controls>
				<C.Control
					onIncrement={onIncrement("physicalTrauma")}
					onDecrement={onDecrement("physicalTrauma")}
				>
					<C.Health value={physical} />
				</C.Control>
				<C.Control
					onIncrement={onIncrement("mentalTrauma")}
					onDecrement={onDecrement("mentalTrauma")}
				>
					<C.Sanity value={mental} />
				</C.Control>
			</C.Controls>
		</C.Container>
	);
};
