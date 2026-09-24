import { MainStatFigure } from "@modules/board/base/entities/base/ui";
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

/** the board health and sanity: the picker, the base value difference and the wounds */
export const MainStat = ({
	stat,
	contentContainerStyle,
	...props
}: MainStatProps) => {
	const C = byStat[stat];

	const showAdditionalInfo = useAppSelector(selectShowAdditionalInformation);
	const showInitialValue = useAppSelector(selectShowInitialHealthAndSanity);
	const negative = useAppSelector(selectAllowNegativeHealthAndSanity);

	const minValue = negative ? Number.NEGATIVE_INFINITY : 0;

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
		minValue,
	});

	const picker = useMainStatPicker({ value, baseValue });

	const showBaseDiff = Boolean(baseValue - initialValue);

	const pickerStyle = {
		opacity: showAdditionalInfo ? 0 : 1,
	};

	const onValueChange = picker.showWounds ? onWoundsChange : onChange;

	// the setting shows it always, the additional information brings it along
	const showInitial = showInitialValue || showAdditionalInfo;

	return (
		<C.Container testID={`board-${stat}`} {...props}>
			{showBaseDiff && <C.Base />}
			<MainStatFigure
				stat={stat}
				size="medium"
				Value={C.Value}
				initialValue={initialValue}
				showInitial={showInitial}
				style={contentContainerStyle}
			>
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
			</MainStatFigure>
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
