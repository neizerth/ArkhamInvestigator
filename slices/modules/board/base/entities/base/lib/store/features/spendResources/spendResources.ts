import { createAction } from "@reduxjs/toolkit";
import type { BoardActualPropChangePayload } from "../../../../model";

export const spendResources = createAction<BoardActualPropChangePayload>(
	"board/spendResources",
);
