import { createSelector } from "@reduxjs/toolkit";
import { getSkillCheckDifficultyCharacter } from "../../logic";
import { selectSkillCheckDifficultyType } from "../skillCheck";

export const selectSkillCheckDifficultyCharacter = createSelector(
	[selectSkillCheckDifficultyType],
	getSkillCheckDifficultyCharacter,
);
