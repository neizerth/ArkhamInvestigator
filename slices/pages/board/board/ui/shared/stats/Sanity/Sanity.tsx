import {
	selectAllowNegativeHealthAndSanity,
	selectShowDamageAndHorror,
	selectShowInitialHealthAndSanity,
} from "@modules/board/base/shared/lib";
import { selectShowAdditionalInformation, useAppSelector } from "@shared/lib";
import { range } from "ramda";
import { useMemo } from "react";
import type { ViewProps } from "react-native";
import { useStat } from "../../../../lib/hooks/useStat";
import * as C from "./Sanity.components";
export type SanityProps = ViewProps;

const horrorData = range(0, 20);

export const Sanity = ({ ...props }: SanityProps) => {
	const showAdditionalInfo = useAppSelector(selectShowAdditionalInformation);
	const showHorror = useAppSelector(selectShowDamageAndHorror);
	const showInitialValue = useAppSelector(selectShowInitialHealthAndSanity);

	const negative = useAppSelector(selectAllowNegativeHealthAndSanity);

	const {
		onPress,
		onLongPress,
		onChange,
		onWoundsChange,
		initialValue,
		baseValue,
		value,
		wounds,
	} = useStat({
		statType: "sanity",
		minValue: negative ? Number.NEGATIVE_INFINITY : 0,
	});

	const diffValue = baseValue - initialValue;

	const maxValue = baseValue + 1;

	const pickerStyle = {
		opacity: showAdditionalInfo ? 0 : 1,
	};

	const showBaseDiff = Boolean(diffValue);

	const data = useMemo(() => {
		const minValue = negative ? -20 : 0;
		const maxHorror = negative ? 20 : maxValue;

		return showHorror ? range(0, maxHorror) : range(minValue, maxValue);
	}, [maxValue, showHorror, negative]);

	const currentValue = showHorror ? wounds : value;

	const onValueChange = showHorror ? onWoundsChange : onChange;

	return (
		<C.Container {...props}>
			{showBaseDiff && <C.BaseSanity />}

			<C.Background>
				{showAdditionalInfo && (
					<C.Additional value={showHorror ? initialValue : `-${wounds}`} />
				)}
				<C.Picker
					value={currentValue}
					data={data}
					onValueChanged={onValueChange}
					onLongPress={onLongPress}
					onPress={onPress}
					style={pickerStyle}
				/>
				{showInitialValue && (
					<C.Initial>
						<C.InitialSeparator />
						<C.InitialValue value={initialValue} />
					</C.Initial>
				)}
			</C.Background>
		</C.Container>
	);
};
