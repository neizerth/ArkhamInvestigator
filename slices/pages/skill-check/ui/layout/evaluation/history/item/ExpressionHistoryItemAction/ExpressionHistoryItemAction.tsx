import type { TouchableOpacityProps } from "@modules/haptic/shared/ui";
import type { TextStyle } from "react-native";
import * as C from "./ExpressionHistoryItemAction.components";

export type ExpressionHistoryItemActionProps = TouchableOpacityProps & {
	icon: string;
	iconStyle?: TextStyle;
};

export const ExpressionHistoryItemAction = ({
	icon,
	iconStyle,
	...props
}: ExpressionHistoryItemActionProps) => {
	return (
		<C.Container {...props}>
			<C.Icon icon={icon} style={iconStyle} />
		</C.Container>
	);
};
