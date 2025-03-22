import {
	selectShowAdditionalInformation,
	useAppSelector,
} from "@shared/lib";
import { range } from "ramda";
import type { ViewProps } from "react-native";
import * as C from "./Sanity.components";
import { useMainStat } from "../../../../lib/hooks/useMainStat";
export type SanityProps = ViewProps;

export const Sanity = ({ ...props }: SanityProps) => {
	const showAdditionalInfo = useAppSelector(selectShowAdditionalInformation);

	const {
		onPress,
		onLongPress,
		onChange,
		initialValue,
		baseValue,
		value,
		wounds
	} = useMainStat('sanity')

	const diffValue = baseValue - initialValue;

	const maxValue = baseValue + 1;

	const pickerStyle = {
		opacity: showAdditionalInfo ? 0 : 1,
	};

	const showBaseDiff = Boolean(diffValue);

	return (
		<C.Container {...props}>
			{showBaseDiff && <C.BaseSanity/>}
			{showAdditionalInfo && <C.Wounds value={`-${wounds}`} />}
			<C.Picker
				value={value}
				data={range(0, maxValue)}
				onValueChanged={onChange}
				onLongPress={onLongPress}
				onPress={onPress}
				style={pickerStyle}
			/>
		</C.Container>
	);
};
