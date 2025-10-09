import * as C from "./ArrowButton.components";
import type { ArrowButtonProps } from "./ArrowButton.types";

export const ArrowButton = ({ direction, ...props }: ArrowButtonProps) => {
	const icon = direction === "left" ? "left-arrow" : "right-arrow";

	return <C.Container {...props} icon={icon} />;
};
