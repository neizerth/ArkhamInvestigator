import type { Draft } from "@reduxjs/toolkit";
import type { StateReducer } from "@shared/model";
import type { BoardState } from "../lib/store/board";
import type { BoardId } from "./board";

export type BoardReducer<Payload> = StateReducer<BoardDraft, Payload>;
export type BoardDraft = Draft<BoardState>;

export type BoardHandler<Payload> = (
	state: BoardDraft,
	payload: Payload,
) => void;

export type OmitBoard<
	P extends {
		boardId: BoardId;
	},
> = Omit<P, "boardId">;
