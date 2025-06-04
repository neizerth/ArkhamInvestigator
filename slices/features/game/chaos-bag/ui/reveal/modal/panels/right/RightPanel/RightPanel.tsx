import type { ViewProps } from "react-native";
import * as C from "./RightPanel.components";

export type RightPanelProps = ViewProps;

export const RightPanel = ({ ...props }: RightPanelProps) => {
	return (
		<C.Container {...props}>
			<C.Actions>
				<C.Item>
					<C.DifficultyPicker />
				</C.Item>
				<C.Item>
					<C.Result />
				</C.Item>
			</C.Actions>
		</C.Container>
	);
};
