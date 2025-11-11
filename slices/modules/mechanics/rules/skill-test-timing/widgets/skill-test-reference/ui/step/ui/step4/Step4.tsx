import type { BoardId } from "@modules/board/base/shared/model";
import { useChaosBagTokenEffects } from "@modules/chaos-bag/effect/features/chaos-bag-effects";
import { selectRevealedTokens } from "@modules/chaos-bag/reveal/base/shared/lib";
import { selectChaosBagTokenValues } from "@modules/chaos-bag/value/entities/lib";
import { useAppSelector } from "@shared/lib";
import { isNotNil, omit } from "ramda";
import { useMemo } from "react";
import * as C from "./Step4.components";

export const Step4 = () => {
	const data = useAppSelector(selectRevealedTokens);
	const boardId: BoardId = "current";
	const tokenValues = useAppSelector(selectChaosBagTokenValues(boardId));
	const effects = useChaosBagTokenEffects({
		boardId,
		tokenValues,
	});

	const tokens = useMemo(() => {
		return data
			.map((token) => {
				const effect = effects?.[token.type];
				if (!effect) {
					return null;
				}
				return {
					...omit(["value"], token),
					effect,
				};
			})
			.filter(isNotNil);
	}, [data, effects]);

	return (
		<C.Container>
			<C.Table>
				{tokens.map((token, index) => (
					<C.Tr key={token.revealId} last={index === tokens.length - 1}>
						<C.Td>
							<C.Token token={token} position={index + 1} />
						</C.Td>
						<C.Effect>
							<C.Text value={token.effect} />
						</C.Effect>
					</C.Tr>
				))}
			</C.Table>
		</C.Container>
	);
};
