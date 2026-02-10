import { createAction } from "@reduxjs/toolkit";
import type { ParsedUrl } from "parse-url";

export const deeplinkChanged = createAction<ParsedUrl>(
	"router/deeplinkChanged",
);
