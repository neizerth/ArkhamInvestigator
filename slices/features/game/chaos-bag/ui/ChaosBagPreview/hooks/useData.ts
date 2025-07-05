import { selectOrderedChaosBagContents } from "@modules/chaos-bag/base/entities/lib";
import { splitIntoGroups, useAppSelector } from "@shared/lib";
import { useMemo } from "react";
import { useListColumns } from "./useListColumns";

export const useData = () => {
	const columns = useListColumns();

	const tokens = useAppSelector(selectOrderedChaosBagContents);

	return useMemo(() => {
		return {
			regular: splitIntoGroups(
				tokens.filter((item) => !item.sealed),
				columns,
			),
			sealed: splitIntoGroups(
				tokens.filter((item) => item.sealed),
				columns,
			),
		};
	}, [tokens, columns]);
};
