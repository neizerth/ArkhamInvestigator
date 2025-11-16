import { createAction } from "@reduxjs/toolkit";
import type { Href, Route, UnknownInputParams } from "expo-router";

export type GoToPagePayload =
	| Route
	| {
			pathname: Route;
			params?: UnknownInputParams;
	  }
	| {
			href: Href;
			replace?: boolean;
	  };

export const goToPage = createAction<GoToPagePayload>("router/goToPage");
