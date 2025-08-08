import { selectShowSkillCheckResult } from "@modules/chaos-bag/result/features/lib";
import { selectChaosBagSkillValue } from "@modules/chaos-bag/reveal/base/shared/lib";
import { useAppSelector } from "@shared/lib";
import type { ViewProps } from "react-native";
import * as C from "./RightPanel.components";

export type RightPanelProps = ViewProps;

export const RightPanel = ({ ...props }: RightPanelProps) => {
	const skillValue = useAppSelector(selectChaosBagSkillValue);

	const show = useAppSelector(selectShowSkillCheckResult);
	return (
		<C.Container {...props}>
			<C.Content>
				{typeof skillValue === "number" && (
					<>
						<C.Item>
							<C.DifficultyPicker />
						</C.Item>
						<C.Item>{show && <C.Result />}</C.Item>
					</>
				)}
			</C.Content>
		</C.Container>
	);
};
