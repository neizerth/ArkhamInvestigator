import { selectChaosBagSkillValue } from "@modules/chaos-bag/base/shared/lib";
import { useAppSelector } from "@shared/lib";
import type { ViewProps } from "react-native";
import * as C from "./RightPanel.components";

export type RightPanelProps = ViewProps;

export const RightPanel = ({ ...props }: RightPanelProps) => {
	const skillValue = useAppSelector(selectChaosBagSkillValue);
	return (
		<C.Container {...props}>
			<C.Content>
				{typeof skillValue === "number" && (
					<>
						<C.Item>
							<C.DifficultyPicker />
						</C.Item>
						<C.Item>
							<C.Result />
						</C.Item>
					</>
				)}
			</C.Content>
		</C.Container>
	);
};
