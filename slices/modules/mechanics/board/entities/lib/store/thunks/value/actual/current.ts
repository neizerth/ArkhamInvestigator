import { createCurrentBoardThunk } from "@modules/board/base/shared/lib";
import { decreaseBoardActualPropValue } from "./decreaseBoardActualPropValue";
import { increaseBoardActualPropValue } from "./increaseBoardActualPropValue";
import { reduceBoardActualPropValue } from "./reduceBoardActualPropValue";
import { setBoardActualPropValue } from "./setBoardActualPropValue";

export const decreaseCurrentPropValue = createCurrentBoardThunk(
	decreaseBoardActualPropValue,
);

export const increaseCurrentPropValue = createCurrentBoardThunk(
	increaseBoardActualPropValue,
);

export const reduceCurrentPropValue = createCurrentBoardThunk(
	reduceBoardActualPropValue,
);

export const setCurrentPropValue = createCurrentBoardThunk(
	setBoardActualPropValue,
);
