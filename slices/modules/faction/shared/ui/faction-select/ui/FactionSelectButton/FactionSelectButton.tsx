import type { TouchableOpacityProps } from "@modules/core/touch/shared/ui";
import type { FactionIconType } from "@modules/faction/shared/model";
import type { Faction } from "@shared/model";
import * as C from "./FactionSelectButton.components";

export type FactionSelectButtonProps = TouchableOpacityProps & {
	value: Faction | "spoiler";
	size: number;
	vertical: boolean;
	selected?: boolean;
	first?: boolean;
	last?: boolean;
	iconType?: FactionIconType;
};

export const FactionSelectButton = ({ ...props }: FactionSelectButtonProps) => {
	const { selected, value, size } = props;

	return (
		<C.Button {...props}>
			{value === "spoiler" ? (
				<C.Icon icon="auto_fail" selected={selected} size={size} />
			) : (
				<C.FactionIcon faction={value} selected={selected} size={size} />
			)}
		</C.Button>
	);
};
