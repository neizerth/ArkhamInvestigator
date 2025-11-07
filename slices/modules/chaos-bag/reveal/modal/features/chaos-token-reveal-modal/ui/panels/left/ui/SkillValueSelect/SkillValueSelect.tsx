import { selectBoardProp } from "@modules/board/base/shared/lib";
import {
	setChaosBagSkillCheckType,
	setChaosBagSkillValue,
} from "@modules/chaos-bag/reveal/base/shared/lib";
import type { TouchableOpacityProps } from "@modules/core/touch/shared/ui";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import type { InvestigatorBoardNumericStat } from "@shared/model";
import { useCallback, useState } from "react";
import * as C from "./SkillValueSelect.components";

export type SkillValueSelectProps = TouchableOpacityProps;

const skillTypes: InvestigatorBoardNumericStat[] = [
	"willpower",
	"intellect",
	"combat",
	"agility",
];

export const SkillValueSelect = (props: SkillValueSelectProps) => {
	const [open, setOpen] = useState(false);

	const dispatch = useAppDispatch();
	const value = useAppSelector(
		selectBoardProp({
			boardId: "current",
			prop: "value",
		}),
	);

	const onPress = useCallback(() => {
		setOpen(!open);
	}, [open]);

	const onSkillPress = useCallback(
		(type: InvestigatorBoardNumericStat) => {
			const skillValue = value[type];
			dispatch(setChaosBagSkillValue(skillValue));
			dispatch(setChaosBagSkillCheckType(type));
		},
		[dispatch, value],
	);

	return (
		<C.Container {...props}>
			<C.Skill icon="wild" onPress={onPress} />
			{open && (
				<C.Menu>
					{skillTypes.map((type) => (
						<C.Skill
							key={type}
							icon={type}
							onPress={() => onSkillPress(type)}
						/>
					))}
				</C.Menu>
			)}
		</C.Container>
	);
};
