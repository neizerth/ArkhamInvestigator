import { selectShowAdditionalInformation, useAppSelector } from "@shared/lib";
import type { HealthProps as BaseHealthProps } from "@shared/ui";
import { range } from "ramda";
import type { ViewStyle } from "react-native";
import { useMainStat } from "../../../../lib/hooks/useMainStat";
import * as C from "./Health.components";

type HealthProps = BaseHealthProps & {
	style?: ViewStyle;
	contentContainerStyle?: BaseHealthProps["style"];
};

export const Health = ({ contentContainerStyle, ...props }: HealthProps) => {
	const showAdditionalInfo = useAppSelector(selectShowAdditionalInformation);

	const {
		onPress,
		onLongPress,
		onChange,
		initialValue,
		baseValue,
		value,
		wounds,
	} = useMainStat("health");

	const maxValue = baseValue + 1;

	const diffValue = baseValue - initialValue;

	const pickerStyle = {
		opacity: showAdditionalInfo ? 0 : 1,
	};

	const showBaseDiff = Boolean(diffValue);

	return (
		<C.Container {...props}>
			{showBaseDiff && <C.BaseHealth />}
			<C.Content style={contentContainerStyle}>
				{showAdditionalInfo && <C.Wounds value={`-${wounds}`} />}
				<C.Picker
					value={value}
					data={range(0, maxValue)}
					onValueChanged={onChange}
					onLongPress={onLongPress}
					onPress={onPress}
					style={pickerStyle}
				/>
			</C.Content>
		</C.Container>
	);
};
