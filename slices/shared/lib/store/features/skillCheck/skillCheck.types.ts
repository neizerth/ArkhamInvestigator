import type { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import type { SkillCheckState } from "./skillCheck";

export type SkillCheckReducer<Payload> = CaseReducer<
	SkillCheckState,
	PayloadAction<Payload>
>;
