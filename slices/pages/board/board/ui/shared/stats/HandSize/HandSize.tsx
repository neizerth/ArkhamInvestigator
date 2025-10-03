import type { HealthProps as BaseHealthProps } from "@shared/ui";
import { range } from "ramda";
import { useMemo } from "react";
import type { ViewStyle } from "react-native";
import { useStat } from "../../../../lib/hooks/useStat";
import * as C from "./HandSize.components";

type HandSizeProps = BaseHealthProps & {
	style?: ViewStyle;
	contentContainerStyle?: BaseHealthProps["style"];
};

export const HandSize = ({
	contentContainerStyle,
	...props
}: HandSizeProps) => {
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
		statType: "handSize",
	});

	const maxValue = baseValue + 1;

	const data = useMemo(() => {
		return range(0, maxValue);
	}, [maxValue]);

	const diffValue = baseValue - initialValue;

	const showBaseDiff = Boolean(diffValue);

	return (
		<C.Container {...props}>
			{showBaseDiff && <C.BaseHandSize />}
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
