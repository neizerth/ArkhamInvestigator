import { getDefaultChaosTokenValue } from "@modules/chaos-bag/value/shared/lib";
import type { ViewProps } from "react-native";
import type { RevealedChaosBagToken } from "../../../shared/model";
import * as C from "./ChaosBagRevealedToken.components";

export type ChaosBagRevealedTokenProps = ViewProps & {
	token: RevealedChaosBagToken;
	position: number;
	showPosition?: boolean;
	selected?: boolean;
};

export const ChaosBagRevealedToken = ({
	token,
	position,
	showPosition = true,
	selected = false,
	...props
}: ChaosBagRevealedTokenProps) => {
	const size = position?.toString().length ?? 0;
	const defaultValue = getDefaultChaosTokenValue(token.type);

	return (
		<C.Container {...props}>
			{showPosition && (
				<C.Position selected={selected}>
					<C.PositionText size={size}>{position}</C.PositionText>
				</C.Position>
			)}
			<C.Token {...token} selected={selected} defaultValue={defaultValue} />
		</C.Container>
	);
};
