import type { ChaosBagHistoryItem } from "@modules/chaos-bag/base/shared/model";
import { selectRevealHistory } from "@modules/chaos-bag/reveal/history/shared/lib";
import { openClearRevealHistoryWarning } from "@modules/core/modal/entities/base/lib";
import { REMOVE_CLIPPED_SUBVIEWS } from "@shared/config";
import { goBack, useAppDispatch, useAppSelector } from "@shared/lib";
import { Delay } from "@shared/ui";
import { TopBar } from "@widgets/navigation";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import type { ListRenderItemInfo } from "react-native";
import * as C from "./ChaosBagHistoryPage.components";

export const ChaosBagHistoryPage = () => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const data = useAppSelector(selectRevealHistory);

	const back = useCallback(() => {
		dispatch(goBack());
	}, [dispatch]);

	const showClearModal = useCallback(() => {
		dispatch(
			openClearRevealHistoryWarning({
				boardId: "current",
			}),
		);
	}, [dispatch]);

	const renderItem = useCallback(
		({ item, index }: ListRenderItemInfo<ChaosBagHistoryItem>) => {
			return <C.Item item={item} position={index + 1} />;
		},
		[],
	);

	return (
		<C.Container>
			<TopBar title={t`Recent token history`} onBack={back}>
				<C.ClearButton icon="trash" onPress={showClearModal} />
			</TopBar>
			<Delay>
				<C.List
					data={data}
					renderItem={renderItem}
					removeClippedSubviews={REMOVE_CLIPPED_SUBVIEWS}
				/>
			</Delay>
		</C.Container>
	);
};
