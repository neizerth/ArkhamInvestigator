import type { ViewProps } from "react-native";
import { useCurrentToken } from "../lib";
import * as C from "./DescriptionPanel.components";

export type DescriptionPanelProps = ViewProps;

export const DescriptionPanel = (props: DescriptionPanelProps) => {
	const { effect, isLast, onPress } = useCurrentToken();

	if (!effect) {
		return null;
	}

	return (
		<C.Container {...props} last={isLast} onPress={onPress}>
			<C.Effect value={effect} />
		</C.Container>
	);
};
