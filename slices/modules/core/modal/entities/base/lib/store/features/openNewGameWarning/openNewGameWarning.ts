import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { modalPrefix } from "@modules/core/modal/shared/base/config";
import { createAction } from "@reduxjs/toolkit";

export type OpenNewGameWarningPayload = PropsWithBoardId;

export const openNewGameWarning = createAction<OpenNewGameWarningPayload>(
	`${modalPrefix}/openNewGameWarning
  `,
);
