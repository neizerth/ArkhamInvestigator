import {
	selectBoardById,
	setCurrentInvestigatorIndex,
} from "@modules/board/base/shared/lib";
import { getSkillCheckDifficultyCharacter } from "@modules/board/skill-check/shared/lib";
import type { ChaosBagHistoryItem } from "@modules/chaos-bag/base/shared/model";
import { getChaosBagSkillCheckFailed } from "@modules/chaos-bag/result/shared/lib";
import {
	goBack,
	isNotEmpty,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { isNumber } from "mathjs";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./ChaosBagRevalItemSkillCheck.components";

export type ChaosBagRevalItemSkillCheckProps = ViewProps & {
	item: ChaosBagHistoryItem;
	boardId: number;
};

export const ChaosBagRevalItemSkillCheck = ({
	item,
	boardId,
	...props
}: ChaosBagRevalItemSkillCheckProps) => {
	const dispatch = useAppDispatch();

	const board = useAppSelector(selectBoardById(boardId));

	const { index, investigator } = board;

	const selectBoard = useCallback(() => {
		dispatch(setCurrentInvestigatorIndex(index));
		dispatch(goBack());
	}, [dispatch, index]);

	const {
		skillCheckType,
		skillCheckValue,
		difficulty,
		difficultyType,
		result,
		succeedBy,
	} = item;

	const difficultyCharacter = getSkillCheckDifficultyCharacter(difficultyType);

	const fail = getChaosBagSkillCheckFailed({
		succeedBy,
		result,
	});

	return (
		<C.Container {...props}>
			<C.Image
				faction={investigator.faction_code}
				code={investigator.id}
				imageId={investigator.image.id}
				size={50}
				showIcon={false}
				onPress={selectBoard}
			/>
			{skillCheckType && (
				<C.SkillType>
					<C.SkillTypeIcon statType={skillCheckType} />
				</C.SkillType>
			)}
			{isNotEmpty(result) && isNotEmpty(succeedBy) && (
				<C.Result>
					{isNumber(result) ? (
						<C.ResultValue value={succeedBy} fail={fail} scale={false} />
					) : (
						<C.SpecialResult>
							{result === "fail" && <C.AutoFail type="autoFail" />}
							{result === "success" && <C.AutoSuccess type="elderSign" />}
						</C.SpecialResult>
					)}
				</C.Result>
			)}
			{typeof skillCheckValue === "number" && (
				<C.SkillValue>
					<C.Value value={skillCheckValue} />
				</C.SkillValue>
			)}
			{typeof difficulty === "number" &&
				typeof skillCheckValue === "number" && (
					<C.Difficulty>
						<C.DifficultyType>{difficultyCharacter}</C.DifficultyType>
						<C.Value value={difficulty} />
					</C.Difficulty>
				)}
		</C.Container>
	);
};
