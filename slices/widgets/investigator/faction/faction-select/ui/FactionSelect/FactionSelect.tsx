import { useAppDispatch } from "@shared/lib";
import type { Faction, FactionFilterType } from "@shared/model";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import { FACTION_SELECT_VALUES } from "../../config";
import { openSpoilerWarning } from "../../lib";
import * as C from "./FactionSelect.components";

export type FactionSelectValue = Faction | "spoiler";

export type FactionSelectProps = ViewProps & {
	onChange?: (value: FactionFilterType) => void;
	value?: FactionFilterType;
};

const values: FactionFilterType[] = [...FACTION_SELECT_VALUES, "spoiler"];

export const FactionSelect = ({
	value,
	onChange,
	...props
}: FactionSelectProps) => {
	const dispatch = useAppDispatch();

	const onPress = useCallback(
		(item: FactionFilterType) => () => {
			if (!onChange) {
				return false;
			}
			if (item === value) {
				return false;
			}
			if (item === "spoiler") {
				dispatch(openSpoilerWarning());
				return;
			}
			onChange(item);
		},
		[value, onChange, dispatch],
	);

	return (
		<C.Container {...props}>
			<C.Content>
				{values.map((item, index) => (
					<C.Button
						key={item}
						value={item}
						selected={value === item}
						onPress={onPress(item)}
						first={index === 0}
						last={index === item.length - 1}
					/>
				))}
			</C.Content>
		</C.Container>
	);
};
