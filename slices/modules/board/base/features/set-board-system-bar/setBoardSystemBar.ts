import { createAction } from "@reduxjs/toolkit";
import type { BoardId } from "../../shared/model";

export const setBoardSystemBar = createAction<BoardId>(
	"board/setSystemBarSaga",
);
