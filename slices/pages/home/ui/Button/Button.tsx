import { PrimaryButton, type PrimaryButtonProps } from "@features/haptic";
import * as C from "./Button.components";

export const Button = ({ children, ...props }: PrimaryButtonProps) => {
	const { size } = props;
	return (
		<PrimaryButton {...props}>
			<C.Text size={size}>{children}</C.Text>
		</PrimaryButton>
	);
};
