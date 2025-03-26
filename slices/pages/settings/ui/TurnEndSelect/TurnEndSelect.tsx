import {
	selectEndTurnStrict,
	setEndTurnStrict,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { Select, type SelectItem } from "@shared/ui";
import { propEq } from "ramda";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { View, type ViewProps } from "react-native";
import * as C from "./TurnEndSelect.components";

export type TurnEndSelectProps = ViewProps;
type PickerItem = SelectItem<boolean>;

export const TurnEndSelect = (props: TurnEndSelectProps) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const selected = useAppSelector(selectEndTurnStrict);

	const values = [
		{
			label: t`No main & additional actions`,
			value: true,
		},
		{
			label: t`No main actions`,
			value: false,
		},
	];

	const value = values.find(propEq(selected, "value"));

	const onChange = useCallback(
		({ value }: PickerItem) => {
			dispatch(setEndTurnStrict(value));
		},
		[dispatch],
	);

	return (
		<C.Container {...props}>
			<C.Select data={values} value={value} onChange={onChange} />
		</C.Container>
	);
};
