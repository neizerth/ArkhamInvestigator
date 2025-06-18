import { createBoardThunk } from "@modules/board/base/shared/lib";
import { resetBoardAbilitiesAction } from "../actions";

export const resetBoardAbilities = createBoardThunk(resetBoardAbilitiesAction);
