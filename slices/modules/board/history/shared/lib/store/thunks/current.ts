import { withCurrentPayload } from "@modules/board/base/shared/lib";
import { addBoardHistoryItem } from "../actions";

export const addCurrentHistoryItem = withCurrentPayload(addBoardHistoryItem);
