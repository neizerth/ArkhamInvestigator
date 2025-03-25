import type { Faction, PropsWithFaction } from "@shared/model";
import type { TouchableOpacityProps } from "@shared/ui";
import * as C from "./FactionSelectButton.components";

export type FactionSelectButtonProps = TouchableOpacityProps &
	PropsWithFaction & {
		selected?: boolean;
		first?: boolean;
		last?: boolean;
	};

export const FactionSelectButton = (props: FactionSelectButtonProps) => {
	const { faction, selected } = props;
	return (
		<C.Button {...props}>
			<C.Icon faction={faction} selected={selected} />
		</C.Button>
	);
};
