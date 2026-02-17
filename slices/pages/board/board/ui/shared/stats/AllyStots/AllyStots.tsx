import type { AllyStatBackground } from "@modules/core/theme/shared/ui";
import { range } from "ramda";
import { type ComponentProps, useMemo } from "react";
import type { ViewStyle } from "react-native";
import { useStat } from "../../../../lib/hooks/useStat";
import * as C from "./AllyStots.components";

type AllyStotsProps = ComponentProps<typeof AllyStatBackground> & {
	style?: ViewStyle;
	contentContainerStyle?: AllyStotsProps["style"];
};

export const AllyStots = ({
	contentContainerStyle,
	...props
}: AllyStotsProps) => {
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
		statType: "allySlots",
	});

	const maxValue = baseValue + 1;

	const data = useMemo(() => {
		return range(0, maxValue);
	}, [maxValue]);

	const diffValue = baseValue - initialValue;

	const showBaseDiff = Boolean(diffValue);

	return (
		<C.Container {...props}>
			{showBaseDiff && <C.BaseAllySlots />}
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
