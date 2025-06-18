import { createCurrentBoardThunk } from "@modules/board/base/shared/lib";
import { decreaseBoardPropValue } from "./decreaseBoardPropValue";
import { increaseBoardPropValue } from "./increaseBoardPropValue";
import { reduceBoardPropValue } from "./reduceBoardPropValue";
import { setBoardPropValue } from "./setBoardPropValue";

export const decreaseCurrentValue = createCurrentBoardThunk(
	decreaseBoardPropValue,
);

export const increaseCurrentValue = createCurrentBoardThunk(
	increaseBoardPropValue,
);

export const reduceCurrentValue = createCurrentBoardThunk(reduceBoardPropValue);

export const setCurrentValue = createCurrentBoardThunk(setBoardPropValue);
