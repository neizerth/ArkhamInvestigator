import { createSelector } from "@reduxjs/toolkit";
import { selectReferenceCardTokenValues } from "@shared/lib";
import type { ChaosTokenType } from "../../../../../../model";

type ReturnType = Partial<Record<ChaosTokenType, number>>;

export const selectReferenceDefaultTokenValues = createSelector(
	[selectReferenceCardTokenValues],
	(data) => {
		return data.reduce((target, item) => {
			const { token } = item;

			if (item.type === "value") {
				const { value } = item;

				target[token] = value;
			}
			if (item.type === "counter" && item.value) {
				target[token] = item.value;
			}
			if (item.type === "select" && item.values) {
				target[token] = item.values[0];
			}
			return target;
		}, {} as ReturnType);
	},
);
