import type { ViewProps } from "react-native";
import type { ChaosBagToken } from "../../../model";
import * as C from "./ChaosBagRevealedToken.components";

export type ChaosBagRevealedTokenProps = ViewProps & {
	token: ChaosBagToken;
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
	return (
		<C.Container {...props}>
			{showPosition && (
				<C.Position selected={selected}>
					<C.PositionText size={size}>{position}</C.PositionText>
				</C.Position>
			)}
			<C.Token {...token} selected={selected} />
		</C.Container>
	);
};
