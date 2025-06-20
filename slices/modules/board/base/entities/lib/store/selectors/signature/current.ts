import { selectIsParallel } from "./selectIsParallel";

import { selectBoardIsUnique } from "./selectIsUnique";

export const selectCurrentIsParallel = selectIsParallel("current");

export const selectCurrentIsUnique = selectBoardIsUnique("current");
