import { selectOrderedChaosBagContents } from "@modules/chaos-bag/base/shared/lib";
import type { ChaosBagToken } from "@modules/chaos-bag/base/shared/model";
import { selectRevealedTokens } from "@modules/chaos-bag/reveal/base/shared/lib";
import { splitIntoGroups, useAppSelector } from "@shared/lib";
import { ascend, prop, sortWith } from "ramda";
import { useMemo } from "react";
import { useListColumns } from "./useListColumns";

export type DisabledChaosToken = ChaosBagToken & {
	disabled: boolean;
};

const getRows = ({
	tokens,
	revealed,
	columns,
}: { tokens: ChaosBagToken[]; revealed: string[]; columns: number }) => {
	const withDisabled: DisabledChaosToken[] = tokens.map((token) => {
		return {
			...token,
			disabled: revealed.includes(token.id),
		};
	});
	const data = sortWith(
		[ascend(prop("disabled")), ascend(prop("type"))],
		withDisabled,
	);
	return splitIntoGroups(data, columns);
};

export const useData = () => {
	const columns = useListColumns();

	const tokens = useAppSelector(selectOrderedChaosBagContents);
	const revealedTokens = useAppSelector(selectRevealedTokens);

	return useMemo(() => {
		const revealed = revealedTokens.map(prop("id"));
		const regularTokens = tokens.filter((item) => !item.sealed);
		const sealedTokens = tokens.filter((item) => item.sealed);

		return {
			regular: getRows({
				tokens: regularTokens,
				revealed: revealed,
				columns,
			}),
			sealed: getRows({
				tokens: sealedTokens,
				revealed: revealed,
				columns,
			}),
		};
	}, [tokens, columns, revealedTokens]);
};
