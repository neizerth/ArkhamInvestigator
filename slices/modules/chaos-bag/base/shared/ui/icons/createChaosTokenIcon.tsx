import type { FC } from "react";
import { ChaosTokenIcon, type ChaosTokenIconProps } from "./ChaosTokenIcon";

type KeepPropsList =
	| "icon"
	| "backgroundIcon"
	| "foregroundColor"
	| "backgroundColor"
	| "scale"
	| "foregroundScale";

export type CreateChaosTokenIconHOCProps = Omit<
	ChaosTokenIconProps,
	"icon" | "backgroundIcon"
>;

export type CreateChaosTokenIconProps = Pick<
	ChaosTokenIconProps,
	KeepPropsList
>;

export const createChaosTokenIcon = (options: CreateChaosTokenIconProps) => {
	const Icon: FC<CreateChaosTokenIconHOCProps> = (props) => {
		return <ChaosTokenIcon {...options} {...props} />;
	};

	Icon.displayName = `CreateChaosTokenIcon(${options.icon})`;

	return Icon;
};
