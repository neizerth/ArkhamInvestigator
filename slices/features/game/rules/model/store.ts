import type { Draft } from "@reduxjs/toolkit";
import type { StateReducer } from "@shared/model";
import type { RulesState } from "../lib";

export type RulesReducer<Payload = void> = StateReducer<RulesState, Payload>;
export type RulesDraft = Draft<RulesState>;

export type RulesHandler<Payload = void> = (
	state: RulesDraft,
	payload: Payload,
) => void;
