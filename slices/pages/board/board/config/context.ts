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
