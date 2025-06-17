import { createCurrentBoardThunk } from "@modules/board/base/shared/lib";
import { setBoardBasePropValue } from "./setBoardBasePropValue";
import { setBoardInitialPropValue } from "./setBoardInitialPropValue";

export const setCurrentBasePropValue = createCurrentBoardThunk(
	setBoardBasePropValue,
);

export const setCurrentInitialPropValue = createCurrentBoardThunk(
	setBoardInitialPropValue,
);
