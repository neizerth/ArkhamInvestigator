import { setRevealSkillValueFromType } from "@modules/chaos-bag/reveal/base/entities/lib";
import type { TouchableOpacityProps } from "@modules/core/touch/shared/ui";
import { useAppDispatch, useBoolean } from "@shared/lib";
import type { InvestigatorBoardNumericStat } from "@shared/model";
import { useCallback } from "react";
import * as C from "./SkillValueSelect.components";

export type SkillValueSelectProps = TouchableOpacityProps;

const skillTypes: InvestigatorBoardNumericStat[] = [
	"willpower",
	"intellect",
	"combat",
	"agility",
];

export const SkillValueSelect = (props: SkillValueSelectProps) => {
	const [open, setOpen] = useBoolean(false);

	const dispatch = useAppDispatch();

	const onSkillPress = useCallback(
		(type: InvestigatorBoardNumericStat) => {
			dispatch(
				setRevealSkillValueFromType({
					boardId: "current",
					type,
				}),
			);
		},
		[dispatch],
	);

	return (
		<C.Container {...props}>
			<C.Toggle icon="wild" onPress={setOpen.toggle} />
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
