import type { GoToPagePayload } from "@modules/core/router/shared/lib";
import { createAction } from "@reduxjs/toolkit";

export const leaveBoard = createAction<GoToPagePayload>("board/leave");
