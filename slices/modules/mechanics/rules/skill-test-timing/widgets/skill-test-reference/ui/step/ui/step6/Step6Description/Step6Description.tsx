import {
	selectSkillCheckDifficulty,
	selectSkillCheckDifficultyCharacter,
} from "@modules/board/skill-check/shared/lib";
import {
	selectIsAutoFail,
	selectIsAutoSuccess,
	selectIsSkillCheckFailed,
	selectSkillCheckResult,
} from "@modules/chaos-bag/result/entities/lib";
import {
	selectChaosBagSkillCheckFailed,
	selectChaosBagSkillCheckType,
} from "@modules/chaos-bag/reveal/base/shared/lib";
import { isBaseSkillType, useAppSelector } from "@shared/lib";
import { isNotNil } from "ramda-adjunct";
import * as C from "./Step6Description.components";

export const Step6Description = () => {
	const skillType = useAppSelector(selectChaosBagSkillCheckType);
	const value = useAppSelector(selectSkillCheckResult);

	const isAutoFail = useAppSelector(selectIsAutoFail);
	const isAutoSuccess = useAppSelector(selectIsAutoSuccess);
	const isFailed = useAppSelector(selectIsSkillCheckFailed);
	const isFixedFailed = useAppSelector(selectChaosBagSkillCheckFailed);
	const difficulty = useAppSelector(selectSkillCheckDifficulty);
	const difficultyCharacter = useAppSelector(
		selectSkillCheckDifficultyCharacter,
	);

	const failed = isFixedFailed ?? isFailed;

	if (
		!skillType ||
		!isBaseSkillType(skillType) ||
		!isNotNil(value) ||
		!isNotNil(failed) ||
		!isNotNil(difficulty)
	) {
		return null;
	}

	const isCustomResult = isFailed !== isFixedFailed;

	return (
		<C.Container>
			<C.Content>
				<C.Group>
					<C.Value value={value} skillType={skillType} />
					{isAutoFail && (
						<>
							<C.Strikethrough />
							<C.Value value={0} />
						</>
					)}
				</C.Group>
				<C.Sign>{difficultyCharacter}</C.Sign>
				<C.Group>
					<C.Difficulty value={difficulty} stroke={false} />
					{isAutoSuccess && (
						<>
							<C.Strikethrough />
							<C.Difficulty value={0} />
						</>
					)}
				</C.Group>
				<C.Sign>=</C.Sign>
				<C.Group>
					<C.Result>
						{isFailed ? (
							<C.Fail type="autoFail" />
						) : (
							<C.Success type="elderSign" />
						)}
						{isCustomResult && <C.Strikethrough />}
					</C.Result>
					{isCustomResult && (
						<C.Result>
							{isFixedFailed ? (
								<C.Fail type="autoFail" />
							) : (
								<C.Success type="elderSign" />
							)}
						</C.Result>
					)}
				</C.Group>
			</C.Content>
		</C.Container>
	);
};
