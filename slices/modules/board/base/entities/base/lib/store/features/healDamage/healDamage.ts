import { createAction } from "@reduxjs/toolkit";
import type { BoardActualPropChangePayload } from "../../../../model";

export const healDamage =
	createAction<BoardActualPropChangePayload>("board/healDamage");
