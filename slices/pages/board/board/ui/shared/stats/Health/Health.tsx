import {
	selectAllowNegativeHealthAndSanity,
	selectShowDamageAndHorror,
	selectShowInitialHealthAndSanity,
} from "@modules/board/base/shared/lib";
import { selectShowAdditionalInformation, useAppSelector } from "@shared/lib";
import type { HealthProps as BaseHealthProps } from "@shared/ui";
import { range } from "ramda";
import { useMemo } from "react";
import type { ViewStyle } from "react-native";
import { useStat } from "../../../../lib/hooks/useStat";
import * as C from "./Health.components";

type HealthProps = BaseHealthProps & {
	style?: ViewStyle;
	contentContainerStyle?: BaseHealthProps["style"];
};

const damageData = range(0, 20);

export const Health = ({ contentContainerStyle, ...props }: HealthProps) => {
	const showAdditionalInfo = useAppSelector(selectShowAdditionalInformation);
	const showDamage = useAppSelector(selectShowDamageAndHorror);
	const showInitialValue = useAppSelector(selectShowInitialHealthAndSanity);
	const negative = useAppSelector(selectAllowNegativeHealthAndSanity);

	const {
		onPress,
		onLongPress,
		onSwipeLeft,
		onSwipeRight,
		onChange,
		onWoundsChange,
		initialValue,
		baseValue,
		value,
		wounds,
	} = useStat({
		statType: "health",
		minValue: negative ? Number.NEGATIVE_INFINITY : 0,
	});

	const maxValue = baseValue + 1;

	const diffValue = baseValue - initialValue;

	const pickerStyle = {
		opacity: showAdditionalInfo ? 0 : 1,
	};

	const showBaseDiff = Boolean(diffValue);

	const data = useMemo(() => {
		const minValue = negative ? -20 : 0;
		const maxDamage = negative ? 20 : maxValue;
		return showDamage ? range(0, maxDamage) : range(minValue, maxValue);
	}, [maxValue, showDamage, negative]);

	const currentValue = showDamage ? wounds : value;

	const onValueChange = showDamage ? onWoundsChange : onChange;

	return (
		<C.Container {...props}>
			{showBaseDiff && <C.BaseHealth />}
			<C.Content style={contentContainerStyle}>
				{showAdditionalInfo && (
					<C.Additional value={showDamage ? initialValue : `-${wounds}`} />
				)}
				<C.Picker
					value={currentValue}
					data={data}
					onValueChanged={onValueChange}
					onLongPress={onLongPress}
					onSwipeLeft={onSwipeLeft}
					onSwipeRight={onSwipeRight}
					onPress={onPress}
					style={pickerStyle}
				/>
				{showInitialValue && (
					<C.Initial>
						<C.InitialSeparator />
						<C.InitialValue value={initialValue} />
					</C.Initial>
				)}
			</C.Content>
		</C.Container>
	);
};
