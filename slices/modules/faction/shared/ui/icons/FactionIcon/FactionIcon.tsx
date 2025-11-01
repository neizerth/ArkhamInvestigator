import type { ViewProps } from "react-native";
import type { PropsWithFaction } from "../../../model";
import { Container, FactionImage, NeutralIcon } from "./FactionIcon.components";

export type FactionIconProps = PropsWithFaction & {
	contentContainerStyle?: ViewProps["style"];
};

export const FactionIcon = ({
	faction,
	contentContainerStyle,
	...props
}: FactionIconProps) => {
	return (
		<Container style={contentContainerStyle}>
			{faction === "neutral" ? (
				<NeutralIcon />
			) : (
				<FactionImage faction={faction} />
			)}
		</Container>
	);
};
