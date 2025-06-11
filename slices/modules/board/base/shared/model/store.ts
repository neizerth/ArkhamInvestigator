import type { Draft } from "@reduxjs/toolkit";
import type { StateReducer } from "@shared/model";
import type { BoardState } from "../lib/store/features/board/board";

export type BoardReducer<Payload> = StateReducer<BoardDraft, Payload>;
export type BoardDraft = Draft<BoardState>;
