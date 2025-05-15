import { selectRevealHistory } from "@features/chaos-bag";
import type { ChaosBagHistoryItem } from "@features/chaos-bag/model";
import { useAppSelector } from "@shared/lib";
import { Delay } from "@shared/ui";
import { useCallback } from "react";
import type { ListRenderItemInfo } from "react-native";
import * as C from "./ChaosBagHistoryPage.components";

export const ChaosBagHistoryPage = () => {
	const data = useAppSelector(selectRevealHistory);

	const renderItem = useCallback(
		(info: ListRenderItemInfo<ChaosBagHistoryItem>) => {
			return null;
		},
		[],
	);

	return (
		<C.Container title="Recent token history" full>
			<Delay>
				<C.List
					data={data}
					renderItem={renderItem}
					removeClippedSubviews={false}
				/>
			</Delay>
		</C.Container>
	);
};
