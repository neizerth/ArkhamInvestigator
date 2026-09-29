import { createAction } from "@reduxjs/toolkit";
import type { Href, RoutePath, UnknownInputParams } from "expo-router";

export type GoToPagePayload =
	| RoutePath
	| {
			pathname: RoutePath;
			params?: UnknownInputParams;
	  }
	| {
			href: Href;
			replace?: boolean;
	  };

export const goToPage = createAction<GoToPagePayload>("router/goToPage");
