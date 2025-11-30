import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

type StartResourcesTestPayload = PropsWithBoardId & {
	count?: number;
};

export const startResourcesTest = createAction<StartResourcesTestPayload>(
	"ParallelSkidsOTooleAbility/startResourcesTest",
);
