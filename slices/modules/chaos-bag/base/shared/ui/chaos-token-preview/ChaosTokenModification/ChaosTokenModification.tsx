import { signedNumber } from "@shared/lib";
import type { ViewProps } from "react-native";
import type { ChaosTokenType } from "../../../model";
import * as C from "./ChaosTokenModification.components";
import { getChaosTokenModificationValueColor } from "./ChaosTokenModification.styles";

const defaultSizes = [1, 0.9, 0.8];

export type ChaosTokenModificationProps = ViewProps & {
	type: ChaosTokenType;
	size: number;
	value: number;
};

export const ChaosTokenModification = ({
	size,
	type,
	value,
	...props
}: ChaosTokenModificationProps) => {
	const color = getChaosTokenModificationValueColor(value);

	return (
		<C.Container {...props}>
			<C.TokenValue
				value={signedNumber(value)}
				textStyle={{ color }}
				stroke={false}
				sizes={defaultSizes}
				size={size}
			/>
			<C.Background value={value} />
		</C.Container>
	);
};
