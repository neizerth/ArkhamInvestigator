import type { GenericFunction } from "@shared/model";
import { useMemo } from "react";
import { debounce } from "../../util";

export const useDebounce = <T extends GenericFunction>(
	func: T,
	wait: number,
) => {
	return useMemo(() => {
		return debounce(func, wait);
	}, [func, wait]);
};
