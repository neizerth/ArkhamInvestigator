import {
	selectAllowNegativeHealthAndSanity,
	selectShowAdditionalInformation,
	selectShowDamageAndHorror,
	selectShowInitialHealthAndSanity,
} from "@modules/board/base/shared/lib";
import { useAppSelector } from "@shared/lib";
import type { InvestigatorMainStatType } from "@shared/model";
import { range } from "ramda";
import { useMemo } from "react";
import type { ViewProps, ViewStyle } from "react-native";
import { useStat } from "../../../../lib/hooks/useStat";
import { byStat } from "./MainStat.components";

export type MainStatProps = ViewProps & {
	stat: InvestigatorMainStatType;
	contentContainerStyle?: ViewStyle;
};

export const MainStat = ({
	stat,
	contentContainerStyle,
	...props
}: MainStatProps) => {
	const C = byStat[stat];

	const showAdditionalInfo = useAppSelector(selectShowAdditionalInformation);
	const showWounds = useAppSelector(selectShowDamageAndHorror);
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
		statType: stat,
		minValue: negative ? Number.NEGATIVE_INFINITY : 0,
	});

	const maxValue = baseValue + 1;

	const showBaseDiff = Boolean(baseValue - initialValue);

	const pickerStyle = {
		opacity: showAdditionalInfo ? 0 : 1,
	};

	const data = useMemo(() => {
		const minValue = negative ? -20 : 0;
		const maxWounds = negative ? 20 : maxValue;
		return showWounds ? range(0, maxWounds) : range(minValue, maxValue);
	}, [maxValue, showWounds, negative]);

	const currentValue = showWounds ? wounds : value;

	const onValueChange = showWounds ? onWoundsChange : onChange;

	const showInitial = showInitialValue || showAdditionalInfo;

	return (
		<C.Container testID={`board-${stat}`} {...props}>
			{showBaseDiff && <C.Base />}
			<C.Content style={contentContainerStyle}>
				{showAdditionalInfo && (
					<C.Additional value={showWounds ? baseValue : `-${wounds}`} />
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
				{showInitial && (
					<C.Initial>
						<C.InitialSeparator />
						<C.InitialValue value={initialValue} />
					</C.Initial>
				)}
			</C.Content>
		</C.Container>
	);
};

export type HealthProps = Omit<MainStatProps, "stat">;
export type SanityProps = Omit<MainStatProps, "stat">;

export const Health = (props: HealthProps) => (
	<MainStat {...props} stat="health" />
);

export const Sanity = (props: SanityProps) => (
	<MainStat {...props} stat="sanity" />
);
