import type { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import type { ISkillCheckState } from "./skillCheck";

export type SkillCheckReducer<Payload> = CaseReducer<ISkillCheckState, PayloadAction<Payload>>
