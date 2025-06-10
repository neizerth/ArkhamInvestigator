import type { TouchableOpacityProps } from "@modules/haptic/widgets";
import type { Faction } from "@shared/model";
import * as C from "./FactionSelectButton.components";

export type FactionSelectButtonProps = TouchableOpacityProps & {
	value: Faction | "spoiler";
	selected?: boolean;
	first?: boolean;
	last?: boolean;
};

export const FactionSelectButton = ({ ...props }: FactionSelectButtonProps) => {
	const { selected, value } = props;
	return (
		<C.Button {...props}>
			{value === "spoiler" ? (
				<C.Icon icon="auto_fail" selected={selected} />
			) : (
				<C.FactionIcon faction={value} selected={selected} />
			)}
		</C.Button>
	);
};
