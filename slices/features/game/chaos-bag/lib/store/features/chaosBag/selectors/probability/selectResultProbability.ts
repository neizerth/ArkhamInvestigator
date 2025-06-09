import { createSelector } from "@reduxjs/toolkit";

type Options = {
	value: string;
	code: string;
};

export const selectResultProbability = (options: Options) =>
	createSelector([], () => {});
