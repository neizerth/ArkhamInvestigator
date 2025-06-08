import { openReferenceCard } from "@entities/reference-card";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import {
	selectChaosBagSkillCheckType,
	selectChaosBagSkillValue,
} from "../../../../../../lib";
import * as C from "./LeftPanel.components";

export type LeftPanelProps = ViewProps;

export const LeftPanel = ({ ...props }: LeftPanelProps) => {
	const dispatch = useAppDispatch();
	const skillValue = useAppSelector(selectChaosBagSkillValue);
	const skillType = useAppSelector(selectChaosBagSkillCheckType);

	const openReference = useCallback(() => {
		dispatch(openReferenceCard());
	}, [dispatch]);
	return (
		<C.Container {...props}>
			<C.Content>
				{typeof skillValue === "number" ? <C.SkillPicker /> : <C.Placeholder />}

				{skillType && (
					<C.SkillType>
						<C.SkillTypeIcon statType={skillType} />
					</C.SkillType>
				)}

				<C.ReferenceButton onPress={openReference}>
					<C.ReferenceIcon icon="list2" />
				</C.ReferenceButton>
			</C.Content>
		</C.Container>
	);
};
