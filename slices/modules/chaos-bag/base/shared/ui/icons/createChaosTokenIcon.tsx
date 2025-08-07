import type { FC } from "react";
import { ChaosTokenIcon, type ChaosTokenIconProps } from "./ChaosTokenIcon";

type KeepPropsList = "icon" | "backgroundIcon" | "backgroundColor" | "scale";

type IconProps = Omit<ChaosTokenIconProps, KeepPropsList>;

export type CreateChaosTokenIconProps = Pick<
	ChaosTokenIconProps,
	KeepPropsList
>;

export const createChaosTokenIcon = (options: CreateChaosTokenIconProps) => {
	const Icon: FC<IconProps> = (props) => {
		return <ChaosTokenIcon {...props} {...options} />;
	};

	Icon.displayName = `CreateChaosTokenIcon(${options.icon})`;

	return Icon;
};
