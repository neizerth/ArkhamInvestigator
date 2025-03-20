import type { Box } from "@shared/model";
import { createContext } from "react";
import type { PropsWithLayout, PropsWithView } from "../model";

type LayoutContenxt = PropsWithLayout & PropsWithView;

export const LayoutContext = createContext<LayoutContenxt>({
	layout: {
		type: "column",
		scale: 1,
		width: 0,
		height: 0,
		gap: 0,
	},
	view: {
		width: 0,
		height: 0,
	},
});

export const SkillsContext = createContext<Box>({
	width: 0,
	height: 0,
});

type PortraitLayoutContextData = {
	height: number;
};
export const PortraitLayoutContext = createContext<PortraitLayoutContextData>({
	height: 0,
});
