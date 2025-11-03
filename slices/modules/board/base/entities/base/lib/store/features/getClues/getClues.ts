import { createAction } from "@reduxjs/toolkit";
import type { PropIncreasePayload } from "../../../../model";

export const getClues = createAction<PropIncreasePayload>("board/getClues");
