import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type { NumericControlProps } from "@modules/core/haptic/shared/ui";
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
		value = 0,
		onIncrement,
		onDecrement,
		onLongPress = onDecrement,
		onPress = onIncrement,
	} = props;
	return (
		<C.Control {...props}>
			<C.Content>
				{showValue && <C.Value value={value} />}
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
