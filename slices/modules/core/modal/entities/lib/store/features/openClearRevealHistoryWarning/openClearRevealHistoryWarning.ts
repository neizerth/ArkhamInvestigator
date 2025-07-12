import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { modalPrefix } from "@modules/core/modal/shared/base/config";
import { createAction } from "@reduxjs/toolkit";

export type OpenClearRevealHistoryWarningPayload = PropsWithBoardId;

export const openClearRevealHistoryWarning =
	createAction<OpenClearRevealHistoryWarningPayload>(
		`${modalPrefix}/openClearRevealHistoryWarning`,
	);
