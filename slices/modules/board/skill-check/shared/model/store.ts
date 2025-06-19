import type { Draft } from "@reduxjs/toolkit";
import type { StateReducer } from "@shared/model";
import type { SkillCheckState } from "../lib/store/features/skillCheck";

export type SkillCheckReducer<Payload> = StateReducer<SkillCheckDraft, Payload>;
export type SkillCheckDraft = Draft<SkillCheckState>;
