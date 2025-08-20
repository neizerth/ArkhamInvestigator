import type { TouchableOpacityProps } from "@modules/core/touch/shared/ui";
import * as C from "./AbilityView.components";
import { getIconStyle } from "./AbilityView.styles";

export type AbilityViewProps = TouchableOpacityProps & {
	icon: string;
	value: boolean;
	enabled?: boolean;
	type?: "crossed" | "checked";
};

export const AbilityView = ({
	value,
	icon,
	type = "crossed",
	...props
}: AbilityViewProps) => {
	const style = getIconStyle(icon);
	return (
		<C.Container {...props} style={[props.style, style]}>
			<C.Icon icon={icon} />
			{type === "crossed" && !value && <C.Cross />}
			{type === "checked" && !value && (
				<>
					<C.CheckOutline />
					<C.CheckFill />
				</>
			)}
		</C.Container>
	);
};
