import type { ViewProps } from "react-native";
import type { PropsWithFaction } from "../../../model";
import * as C from "./FactionIcon.components";

export type FactionIconProps = PropsWithFaction & {
	contentContainerStyle?: ViewProps["style"];
};

export const FactionIcon = ({
	faction,
	contentContainerStyle,
	...props
}: FactionIconProps) => {
	return (
		<C.Container style={contentContainerStyle}>
			{faction === "neutral" ? (
				<C.NeutralIcon />
			) : (
				<C.FactionImage faction={faction} />
			)}
		</C.Container>
	);
};
