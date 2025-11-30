import { createAction } from "@reduxjs/toolkit";
import type { PropsWithBoardId } from "../../model";

export const boardChanged = createAction<PropsWithBoardId>("board/changed");
