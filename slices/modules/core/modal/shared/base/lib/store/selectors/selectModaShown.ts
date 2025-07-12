import { createSelector } from "@reduxjs/toolkit";
import { selectModalId } from "../modal";

export const selectModaShown = (id: string) =>
	createSelector([selectModalId], (modalId) => modalId === id);
