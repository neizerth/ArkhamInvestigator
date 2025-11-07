import { setRevealSkillValueFromType } from "@modules/chaos-bag/reveal/base/entities/lib";
import type { TouchableOpacityProps } from "@modules/core/touch/shared/ui";
import { useAppDispatch } from "@shared/lib";
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

	const onPress = useCallback(() => {
		setOpen(!open);
	}, [open]);

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
