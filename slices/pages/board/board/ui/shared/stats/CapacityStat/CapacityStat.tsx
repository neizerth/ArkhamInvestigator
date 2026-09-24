import { range } from "ramda";
import { useMemo } from "react";
import type { ViewProps, ViewStyle } from "react-native";
import { useStat } from "../../../../lib/hooks/useStat";
import { byStat } from "./CapacityStat.components";
import type { CapacityStatType } from "./CapacityStat.styles";

export type CapacityStatProps = ViewProps & {
	stat: CapacityStatType;
	contentContainerStyle?: ViewStyle;
};

/** hand size and ally slots: the picker and the base value difference */
export const CapacityStat = ({
	stat,
	contentContainerStyle,
	...props
}: CapacityStatProps) => {
	const C = byStat[stat];

	const {
		onPress,
		onLongPress,
		onChange,
		onSwipeLeft,
		onSwipeRight,
		initialValue,
		baseValue,
		value,
	} = useStat({
		statType: stat,
	});

	const maxValue = baseValue + 1;

	const data = useMemo(() => range(0, maxValue), [maxValue]);

	const showBaseDiff = Boolean(baseValue - initialValue);

	return (
		<C.Container {...props}>
			{showBaseDiff && <C.Base />}
			<C.Content style={contentContainerStyle}>
				<C.Picker
					key={data.length}
					value={value}
					data={data}
					onValueChanged={onChange}
					onLongPress={onLongPress}
					onPress={onPress}
					onSwipeLeft={onSwipeLeft}
					onSwipeRight={onSwipeRight}
				/>
			</C.Content>
		</C.Container>
	);
};

export type HandSizeProps = Omit<CapacityStatProps, "stat">;
export type AllyStotsProps = Omit<CapacityStatProps, "stat">;

export const HandSize = (props: HandSizeProps) => (
	<CapacityStat {...props} stat="handSize" />
);

export const AllyStots = (props: AllyStotsProps) => (
	<CapacityStat {...props} stat="allySlots" />
);
