import type {
	InvestigatorBoardImage,
	PropsWithBoardId,
} from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";
import type { Box, RectPosition } from "@shared/model";

export type UpdateBoardBackgroundPayload = PropsWithBoardId & {
	image: InvestigatorBoardImage;
	view: Box;
	offset: RectPosition;
};

export const updateBoardBackground = createAction<UpdateBoardBackgroundPayload>(
	"board/updateBackground",
);

export const boardBackgroundUpdated =
	createAction<UpdateBoardBackgroundPayload>("board/backgroundUpdated");
