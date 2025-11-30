import { createAction } from "@reduxjs/toolkit";
import type { BoardActualPropChangePayload } from "../../../../model";

export const getResources =
	createAction<BoardActualPropChangePayload>("board/getResources");
