import type { ButtonProps } from "../Button";

export type ArrowButtonProps = Omit<ButtonProps, "icon"> & {
	direction: "left" | "right";
};
