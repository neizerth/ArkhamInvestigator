import { createSelector } from "@reduxjs/toolkit";
import type { ChaosTokenType } from "../../../../../../model";
import { selectDefaultTokenValuesByCode } from "./selectDefaultTokenValuesByCode";

type Options = {
	code: string;
	type: ChaosTokenType;
};

export const selectChaosTokenValueByType = ({ type, code }: Options) =>
	createSelector([selectDefaultTokenValuesByCode(code)], (data) => {
		return data[type] || 0;
	});
