import { createSelector } from "@reduxjs/toolkit";
import { selectModalId } from "../modal";

export const selectModalShown = (id: string) =>
	createSelector([selectModalId], (modalId) => modalId === id);
