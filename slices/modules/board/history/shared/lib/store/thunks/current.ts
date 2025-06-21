import { withCurrentPayload } from "@modules/board/base/shared/lib";
import { addBoardHistoryItem, clearBoardHistory } from "../actions";

export const addCurrentHistoryItem = withCurrentPayload(addBoardHistoryItem);

export const clearCurrentHistory = withCurrentPayload(clearBoardHistory);
