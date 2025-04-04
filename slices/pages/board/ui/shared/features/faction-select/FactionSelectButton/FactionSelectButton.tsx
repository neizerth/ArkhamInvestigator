import type { TouchableOpacityProps } from "@features/haptic";
import type { PropsWithFaction } from "@shared/model";
import * as C from "./FactionSelectButton.components";

export type FactionSelectButtonProps = TouchableOpacityProps &
	PropsWithFaction & {
		selected: boolean;
	};

export const FactionSelectButton = (props: FactionSelectButtonProps) => {
	const { faction } = props;
	return (
		<C.Container {...props}>
			{faction === "neutral" ? (
				<C.Neutral>
					<C.NeutralIcon icon="neutral" />
				</C.Neutral>
			) : (
				<C.Faction faction={faction} />
			)}
		</C.Container>
	);
};
