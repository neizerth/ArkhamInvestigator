import type { Draft } from "@reduxjs/toolkit";
import type { StateReducer } from "@shared/model";
import type { AssetsState } from "../lib";

export type AssetsReducer<Payload = void> = StateReducer<AssetsDraft, Payload>;
export type AssetsDraft = Draft<AssetsState>;

export type AssetsHandler<Payload = void> = (
	state: AssetsDraft,
	payload: Payload,
) => void;
