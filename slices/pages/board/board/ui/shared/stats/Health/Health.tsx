import {
	selectShowAdditionalInformation,
	selectShowDamageAndHorror,
	useAppSelector,
} from "@shared/lib";
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

	const {
		onPress,
		onLongPress,
		onChange,
		onWoundsChange,
		initialValue,
		baseValue,
		value,
		wounds,
	} = useStat("health");

	const maxValue = baseValue + 1;

	const diffValue = baseValue - initialValue;

	const pickerStyle = {
		opacity: showAdditionalInfo ? 0 : 1,
	};

	const showBaseDiff = Boolean(diffValue);

	const data = useMemo(() => {
		return showDamage ? damageData : range(-20, maxValue);
	}, [maxValue, showDamage]);

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
					onPress={onPress}
					style={pickerStyle}
				/>
			</C.Content>
		</C.Container>
	);
};
