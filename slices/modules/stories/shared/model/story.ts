import type { Single } from "@shared/model";
import type { LocaleBuild } from "arkham-investigator-data";

export type Story = Single<LocaleBuild["stories"]>;
export type StoryDifficultyLevel = Single<Story["difficultyLevels"]>;
