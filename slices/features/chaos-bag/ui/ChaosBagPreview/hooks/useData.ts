import { splitIntoGroups, useAppSelector } from "@shared/lib";
import { useMemo } from "react";
import { selectOrderedChaosBagContents } from "../../../lib";
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
