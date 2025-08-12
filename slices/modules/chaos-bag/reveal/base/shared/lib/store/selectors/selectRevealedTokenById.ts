import { createSelector } from "@reduxjs/toolkit";
import { whereId } from "@shared/lib/util";
import { selectRevealedTokens } from "../chaosBagReveal";

export const selectRevealedTokenById = (id: string) =>
	createSelector([selectRevealedTokens], (tokens) => tokens.find(whereId(id)));
