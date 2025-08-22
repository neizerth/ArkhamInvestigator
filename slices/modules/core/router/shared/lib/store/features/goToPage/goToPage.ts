import { createAction } from "@reduxjs/toolkit";
import type { Href } from "expo-router";

export type GoToPagePayload =
	| Href
	| {
			href: Href;
			replace?: boolean;
	  };

export const goToPage = createAction<GoToPagePayload>("router/goToPage");
