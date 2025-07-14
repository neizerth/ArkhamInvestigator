import type { AppSelector } from "@shared/model";
import { useMemo } from "react";
import { type EqualityFn, useSelector } from "react-redux";

type Selector<Input, Result> = (param: Input) => AppSelector<Result>;

export const createSelectorHook = <Input, Result>(
	selectorFactory: Selector<Input, Result>,
	equalityFn?: EqualityFn<Result>,
) => {
	return (param: Input) => {
		const selector = useMemo(
			() => selectorFactory(param),
			[selectorFactory, param],
		);
		return useSelector(selector, equalityFn);
	};
};
