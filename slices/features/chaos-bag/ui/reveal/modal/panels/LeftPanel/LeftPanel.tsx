import { useAppSelector } from "@shared/lib";
import type { ViewProps } from "react-native";
import {
	selectChaosBagSkillCheckType,
	selectChaosBagSkillValue,
} from "../../../../../lib";
import * as C from "./LeftPanel.components";

export type LeftPanelProps = ViewProps;

export const LeftPanel = ({ ...props }: LeftPanelProps) => {
	const skillValue = useAppSelector(selectChaosBagSkillValue);
	const skillType = useAppSelector(selectChaosBagSkillCheckType);

	return (
		<C.Container {...props}>
			<C.Actions>
				<C.SkillValue>
					{skillValue !== null && <C.SkillValueText value={skillValue} />}
					{skillType && (
						<C.SkillType>
							<C.SkillTypeIcon statType={skillType} />
						</C.SkillType>
					)}
				</C.SkillValue>
			</C.Actions>
		</C.Container>
	);
};
