import type { ViewProps } from "react-native";
import type { ChaosBagToken } from "../../../model";
import * as C from "./ChaosBagRevealedToken.components";

export type ChaosBagRevealedTokenProps = ViewProps & {
	token: ChaosBagToken;
	position: number;
	showPosition?: boolean;
};

export const ChaosBagRevealedToken = ({
	token,
	position,
	showPosition = true,
	...props
}: ChaosBagRevealedTokenProps) => {
	const size = position.toString().length;
	return (
		<C.Container {...props}>
			{showPosition && (
				<C.Position>
					<C.PositionText size={size}>{position}</C.PositionText>
				</C.Position>
			)}
			<C.Token {...token} />
		</C.Container>
	);
};
