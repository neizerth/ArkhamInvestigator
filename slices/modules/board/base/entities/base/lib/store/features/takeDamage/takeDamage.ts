import { createAction } from "@reduxjs/toolkit";
import type { BoardActualPropChangePayload } from "../../../../model";

export const takeDamage =
	createAction<BoardActualPropChangePayload>("board/takeDamage");
