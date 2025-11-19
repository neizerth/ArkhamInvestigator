import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export const chargeFluxStabilizer = createAction<PropsWithBoardId>(
	"DarkMatterKateWinthrop/chargeFluxStabilizer",
);
