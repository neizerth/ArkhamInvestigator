import {
	selectChaosBagSkillCheckType,
	selectChaosBagSkillValue,
} from "@modules/chaos-bag/reveal/base/shared/lib";
import { useAppSelector } from "@shared/lib";
import { isNumber } from "ramda-adjunct";
import type { ViewProps } from "react-native";
import * as C from "./LeftPanel.components";

export type LeftPanelProps = ViewProps;

export const LeftPanel = ({ ...props }: LeftPanelProps) => {
	const skillValue = useAppSelector(selectChaosBagSkillValue);
	const skillType = useAppSelector(selectChaosBagSkillCheckType);

	const showSkillValue = isNumber(skillValue);

	return (
		<C.Container {...props}>
			<C.Content>
				{showSkillValue ? <C.SkillPicker /> : <C.Placeholder />}

				{skillType && (
					<C.SkillType>
						<C.SkillTypeIcon statType={skillType} />
					</C.SkillType>
				)}

				{!skillType && !showSkillValue && <C.SetType />}

				<C.Menu />
			</C.Content>
		</C.Container>
	);
};
