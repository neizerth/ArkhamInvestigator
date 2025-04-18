import { selectShowAdditionalInformation, useAppSelector } from "@shared/lib";
import type { ImageBackgroundProps } from "@shared/ui";
import { range } from "ramda";
import { useStat } from "../../../../lib/hooks/useStat";
import * as C from "./Sanity.components";
export type SanityProps = ImageBackgroundProps;

export const Sanity = ({ ...props }: SanityProps) => {
	const showAdditionalInfo = useAppSelector(selectShowAdditionalInformation);

	const {
		onPress,
		onLongPress,
		onChange,
		initialValue,
		baseValue,
		value,
		wounds,
	} = useStat("sanity");

	const diffValue = baseValue - initialValue;

	const maxValue = baseValue + 1;

	const pickerStyle = {
		opacity: showAdditionalInfo ? 0 : 1,
	};

	const showBaseDiff = Boolean(diffValue);

	return (
		<C.Container {...props}>
			{showBaseDiff && <C.BaseSanity />}
			{showAdditionalInfo && <C.Wounds value={`-${wounds}`} />}
			<C.Picker
				value={value}
				data={range(-20, maxValue)}
				onValueChanged={onChange}
				onLongPress={onLongPress}
				onPress={onPress}
				style={pickerStyle}
			/>
		</C.Container>
	);
};
