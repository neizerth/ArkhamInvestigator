import { createAction } from "@reduxjs/toolkit";
import type { BoardActualPropChangePayload } from "../../../../model";

export const getClues =
	createAction<BoardActualPropChangePayload>("board/getClues");
