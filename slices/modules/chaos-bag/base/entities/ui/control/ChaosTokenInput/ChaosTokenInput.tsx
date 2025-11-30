import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type { NumericControlProps } from "@shared/ui";
import * as C from "./ChaosTokenInput.components";

export type ChaosTokenInputProps = NumericControlProps & {
	type: ChaosTokenType;
	onLongPress?: () => void;
	onPress?: () => void;
	showValue?: boolean;
	sealedCount?: number;
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
		sealedCount = 0,
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
					<C.Token type={type} sealedCount={sealedCount} />
				</C.TokenButton>
			</C.Content>
		</C.Control>
	);
};
