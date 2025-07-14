import type { RootState } from "@shared/model";
import { selectIcons } from "../icons";

export const selectIcon = (code: string) => (state: RootState) =>
	selectIcons(state)[code];
