import { createAction } from "@reduxjs/toolkit";
import type { PropIncreasePayload } from "../../../../model";

export const getResources =
	createAction<PropIncreasePayload>("board/getResources");
