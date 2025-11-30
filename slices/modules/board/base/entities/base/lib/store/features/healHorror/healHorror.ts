import { createAction } from "@reduxjs/toolkit";
import type { BoardActualPropChangePayload } from "../../../../model";

export const healHorror =
	createAction<BoardActualPropChangePayload>("board/healHorror");
