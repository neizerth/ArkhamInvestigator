import { useAppTranslation } from "@features/i18n";
import { PrimaryButton, type PrimaryButtonProps } from "@shared/ui";
import * as C from "./Button.components";

export const Button = ({ children, ...props }: PrimaryButtonProps) => {
	const { size } = props;
	return (
		<PrimaryButton {...props}>
			<C.Text size={size}>{children}</C.Text>
		</PrimaryButton>
	);
};
