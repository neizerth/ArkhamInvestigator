import { selectReferenceCard } from "@modules/stories/shared/lib";
import { useAppSelector } from "@shared/lib";
import { useCallback, useMemo, useState } from "react";
import type { ViewProps } from "react-native";
import * as C from "./ScenarioReferenceEffects.components";
import { useTokenReference } from "./useTokenReference";

export type ScenarioReferenceEffectsProps = ViewProps;

export const ScenarioReferenceEffects = (
	props: ScenarioReferenceEffectsProps,
) => {
	const card = useAppSelector(selectReferenceCard);
	const [reference, small] = useTokenReference();
	const [openId, setOpenId] = useState<string | null>(null);

	const openItem = useCallback(
		(id: string) => () => {
			setOpenId((prev) => (prev === id ? null : id));
		},
		[],
	);

	if (!card) {
		return;
	}

	const data = useMemo(() => {
		if (openId === null) {
			return reference;
		}
		return reference.filter((item) => item.id === openId);
	}, [reference, openId]);

	return (
		<C.Container {...props}>
			{data.map((item) => (
				<C.Item
					key={item.id}
					item={item}
					language={card.locale}
					small={small}
					onPress={openItem(item.id)}
					open={openId === item.id}
				/>
			))}
		</C.Container>
	);
};
