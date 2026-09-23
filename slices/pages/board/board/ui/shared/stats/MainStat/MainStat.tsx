import {
	selectAllowNegativeHealthAndSanity,
	selectShowAdditionalInformation,
	selectShowInitialHealthAndSanity,
	useMainStatPicker,
} from "@modules/board/base/shared/lib";
import { useAppSelector } from "@shared/lib";
import type { InvestigatorMainStatType } from "@shared/model";
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
	} = useStat({
		statType: stat,
		minValue: negative ? Number.NEGATIVE_INFINITY : 0,
	});

	const picker = useMainStatPicker({ value, baseValue });

	const showBaseDiff = Boolean(baseValue - initialValue);

	const pickerStyle = {
		opacity: showAdditionalInfo ? 0 : 1,
	};

	const onValueChange = picker.showWounds ? onWoundsChange : onChange;

	const showInitial = showInitialValue || showAdditionalInfo;

	return (
		<C.Container testID={`board-${stat}`} {...props}>
			{showBaseDiff && <C.Base />}
			<C.Content style={contentContainerStyle}>
				{showAdditionalInfo && (
					<C.Additional
						value={picker.showWounds ? baseValue : `-${picker.wounds}`}
					/>
				)}
				<C.Picker
					value={picker.value}
					data={picker.data}
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
