import type { Box } from "@shared/model";

export type HeaderLayoutType = "row" | "column";

export type HeaderLayout = {
	scale: number;
	width: number;
	height: number;
	gap: number;
} & HeaderTypedLayout;

export type HeaderTypedLayout =
	| {
			type: "row";
	  }
	| {
			type: "column";
	  };

export type PropsWithLayout = {
	layout: HeaderLayout;
};

export type PropsWithView = {
	view: Box;
};
