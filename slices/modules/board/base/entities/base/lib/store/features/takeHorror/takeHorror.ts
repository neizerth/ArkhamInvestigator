import { createAction } from "@reduxjs/toolkit";
import type { BoardActualPropChangePayload } from "../../../../model";

export const takeHorror =
	createAction<BoardActualPropChangePayload>("board/takeHorror");
