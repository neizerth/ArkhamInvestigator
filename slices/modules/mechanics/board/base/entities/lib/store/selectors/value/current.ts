import { selectBoardDamage } from "./selectBoardDamage";
import { selectBoardHorror } from "./selectBoardHorror";

export const selectCurrentHorror = selectBoardHorror("current");
export const selectCurrentDamage = selectBoardDamage("current");
