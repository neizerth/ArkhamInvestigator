import type { RootState } from "@shared/model";
import { selectModalId } from "../modal";

export const selectModaShown = (id: string) => (state: RootState) =>
	selectModalId(state) === id;
