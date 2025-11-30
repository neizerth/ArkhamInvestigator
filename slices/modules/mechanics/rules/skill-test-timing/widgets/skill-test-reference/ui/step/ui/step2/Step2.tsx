import { setSkillCheckModifier } from "@modules/chaos-bag/reveal/base/entities/lib/store/features/setSkillCheckModifier";
import {
	selectChaosBagSkillCheckType,
	selectSkillCheckModifier,
} from "@modules/chaos-bag/reveal/base/shared/lib";
import { isBaseSkillType, useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback } from "react";
import * as C from "./Step2.components";

export const Step2 = () => {
	const dispatch = useAppDispatch();
	const skillType = useAppSelector(selectChaosBagSkillCheckType);
	const value = useAppSelector(selectSkillCheckModifier);

	const increment = useCallback(() => {
		dispatch(
			setSkillCheckModifier({
				boardId: "current",
				value: value + 1,
			}),
		);
	}, [dispatch, value]);

	const decrement = useCallback(() => {
		if (value <= 0) {
			return false;
		}
		dispatch(
			setSkillCheckModifier({
				boardId: "current",
				value: value - 1,
			}),
		);
	}, [dispatch, value]);

	if (!skillType || !isBaseSkillType(skillType)) {
		return null;
	}

	return (
		<C.Container>
			<C.Control
				min={0}
				value={value}
				onIncrement={increment}
				onDecrement={decrement}
			>
				<C.Content onPress={increment} onLongPress={decrement}>
					<C.Value skillType={skillType} value={value} />
				</C.Content>
			</C.Control>
		</C.Container>
	);
};
