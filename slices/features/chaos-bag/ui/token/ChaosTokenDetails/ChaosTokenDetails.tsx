import { useCallback } from "react";
import type { ViewProps } from "react-native";
import { chaosToken } from "../../../config";
import type { ChaosTokenType } from "../../../model";
import * as C from "./ChaosTokenDetails.components";

export type ChaosTokenDetailsProps = ViewProps & {
	type: ChaosTokenType;
	count?: number;
	preview?: boolean;
	inputStyle?: ViewProps["style"];
};

export const ChaosTokenDetails = ({
	type,
	count = 0,
	inputStyle,
	preview,
	...props
}: ChaosTokenDetailsProps) => {
	const max = chaosToken.count[type];

	const onDecrement = useCallback(() => {}, []);
	const onIncrement = useCallback(() => {}, []);
	return (
		<C.Container {...props}>
			<C.Content>
				<C.Input
					style={inputStyle}
					type={type}
					value={count}
					min={0}
					max={max}
					onDecrement={onDecrement}
					onIncrement={onIncrement}
					showValue={!preview}
				/>
			</C.Content>
		</C.Container>
	);
};
