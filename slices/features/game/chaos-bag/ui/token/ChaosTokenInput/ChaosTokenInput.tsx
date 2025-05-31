import { characters } from "@shared/config";
import type { NumericControlProps } from "../../../../../haptic";
import type { ChaosTokenType } from "../../../model";
import * as C from "./ChaosTokenInput.components";

export type ChaosTokenInputProps = NumericControlProps & {
	type: ChaosTokenType;
	onLongPress?: () => void;
	onPress?: () => void;
	showValue?: boolean;
};

export const ChaosTokenInput = ({
	type,
	showValue,
	...props
}: ChaosTokenInputProps) => {
	const {
		value,
		onIncrement,
		onDecrement,
		onLongPress = onDecrement,
		onPress = onIncrement,
	} = props;
	return (
		<C.Control {...props}>
			<C.Content>
				{showValue && <C.Value>{`${characters.multiply}${value}`}</C.Value>}
				<C.TokenButton
					onPress={onPress}
					onLongPress={onLongPress}
					activeOpacity={0.8}
				>
					<C.Token type={type} />
				</C.TokenButton>
			</C.Content>
		</C.Control>
	);
};
