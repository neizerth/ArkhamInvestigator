import type { FC } from "react";
import { type DefinedIconProps, Icon } from "../../ui/game/icons";

export const withIcon = (icon: string) => {
	const Component: FC<DefinedIconProps> = (props) => {
		return <Icon {...props} icon={icon} />;
	};

	const displayName = Component.displayName || Component.name;
	Component.displayName = `WithIcon(${displayName})`;

	return Component as FC<DefinedIconProps>;
};
