import { useAppSelector } from "@shared/lib";
import type { ViewProps } from "react-native";
import {
	selectChaosBagSkillCheckType,
	selectChaosBagSkillValue,
} from "../../../../../../lib";
import * as C from "./LeftPanel.components";

export type LeftPanelProps = ViewProps;

export const LeftPanel = ({ ...props }: LeftPanelProps) => {
	const skillValue = useAppSelector(selectChaosBagSkillValue);
	const skillType = useAppSelector(selectChaosBagSkillCheckType);

	return (
		<C.Container {...props}>
			<C.Content>
				{typeof skillValue === "number" && <C.SkillPicker />}
				{skillType && (
					<C.SkillType>
						<C.SkillTypeIcon statType={skillType} />
					</C.SkillType>
				)}
			</C.Content>
		</C.Container>
	);
};
