import type { ViewProps } from "react-native";
import * as C from "./TentacleUnderline.components";

export type TentacleUnderlineProps = ViewProps;

export const TentacleUnderline = ({
	children,
	...props
}: TentacleUnderlineProps) => {
	return (
		<C.Container {...props}>
			<C.Group>
				<C.Left />
				<C.Content>{children}</C.Content>
				<C.RuleContainer>
					<C.Rule />
				</C.RuleContainer>
				<C.Right />
			</C.Group>
		</C.Container>
	);
};
