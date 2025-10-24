import { selectArtworksEnabled } from "@modules/core/theme/shared/lib";
import {
	FACTION_VALUES,
	factionFilterTypes,
} from "@modules/faction/shared/config";
import { useAppSelector } from "@shared/lib";
import type { Faction, FactionFilterType } from "@shared/model";
import { equals, reject } from "ramda";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./FactionSelect.components";

export type FactionSelectProps = ViewProps & {
	onChange?: (value: FactionFilterType) => void;
	value?: FactionFilterType;
};

const defautlFilters = reject(equals("neutral" as Faction), FACTION_VALUES);

export const FactionSelect = ({
	value,
	onChange,
	...props
}: FactionSelectProps) => {
	const artworksEnabled = useAppSelector(selectArtworksEnabled);
	const data = artworksEnabled ? factionFilterTypes : defautlFilters;

	const onPress = useCallback(
		(item: FactionFilterType) => () => {
			if (!onChange) {
				return false;
			}
			if (item === value) {
				return false;
			}
			onChange(item);
		},
		[value, onChange],
	);

	return (
		<C.Container {...props}>
			<C.Content>
				{data.map((item, index) => (
					<C.Button
						key={item}
						value={item}
						selected={value === item}
						onPress={onPress(item)}
						first={index === 0}
						last={index === data.length - 1}
					/>
				))}
			</C.Content>
		</C.Container>
	);
};
