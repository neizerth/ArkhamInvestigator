import { useKeyboardButtonStyles } from "../../lib";
import type { KeyboardButtonProps } from "../../model";
import * as C from "./IconKeyboardButton.components";

export type IconKeyboardButtonProps = KeyboardButtonProps & {
	icon: string;
};

export const IconKeyboardButton = ({
	icon,
	...props
}: IconKeyboardButtonProps) => {
	const style = useKeyboardButtonStyles();
	return (
		<C.Container {...props} style={[props.style, style.button]}>
			<C.Icon icon={icon} />
		</C.Container>
	);
};
