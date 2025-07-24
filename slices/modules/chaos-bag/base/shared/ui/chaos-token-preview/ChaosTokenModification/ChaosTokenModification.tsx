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
	sealed?: boolean;
};

export const ChaosTokenModification = ({
	size,
	type,
	value,
	sealed,
	...props
}: ChaosTokenModificationProps) => {
	const color = getChaosTokenModificationValueColor(value);

	const sealedBorder = size > 40;
	const showBackgoundBorder = value < 1;

	return (
		<C.Container {...props}>
			<C.Content>
				<C.TokenValue
					value={signedNumber(value)}
					textStyle={{ color }}
					stroke={false}
					sizes={defaultSizes}
					size={size}
				/>
			</C.Content>

			<C.Background
				value={value}
				sealed={sealed}
				sealedBorder={sealedBorder}
				showBorder={showBackgoundBorder}
			/>
		</C.Container>
	);
};
