import type { TouchableOpacityProps } from "@modules/haptic/shared/ui";
import * as C from "./Special.components";
import { getIconStyle } from "./Special.styles";

export type SpecialProps = TouchableOpacityProps & {
	icon: string;
	value: boolean;
};

export const Special = ({ value, icon, ...props }: SpecialProps) => {
	const style = getIconStyle(icon);
	return (
		<C.Container {...props} style={[props.style, style]}>
			<C.Icon icon={icon} />
			{!value && <C.Used icon="cross_c" />}
		</C.Container>
	);
};
