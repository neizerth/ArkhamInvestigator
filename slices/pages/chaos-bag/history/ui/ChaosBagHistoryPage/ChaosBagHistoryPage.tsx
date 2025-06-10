import {
	clearRevealHistory,
	selectRevealHistory,
} from "@features/game/chaos-bag";
import type { ChaosBagHistoryItem } from "@features/game/chaos-bag/model";
import { useAppTranslation } from "@modules/core/i18n/shared/lib";
import { useModal } from "@modules/core/modal/shared/lib";
import { REMOVE_CLIPPED_SUBVIEWS } from "@shared/config";
import { goBack, useAppDispatch, useAppSelector } from "@shared/lib";
import { Delay } from "@shared/ui";
import { TopBar } from "@widgets/navigation";
import { useCallback } from "react";
import type { ListRenderItemInfo } from "react-native";
import * as C from "./ChaosBagHistoryPage.components";

export const ChaosBagHistoryPage = () => {
	const { t } = useAppTranslation();
	const dispatch = useAppDispatch();
	const data = useAppSelector(selectRevealHistory);

	const back = useCallback(() => {
		dispatch(goBack());
	}, [dispatch]);

	const clearHistory = useCallback(() => {
		dispatch(clearRevealHistory());
	}, [dispatch]);

	const [showClearModal] = useModal({
		id: "clear-board",
		data: {
			contentType: "text",
			type: "faction",
			faction: "neutral",
			title: t`modal.skillCheck.clear`,
			text: t`modal.skillCheck.clear.text`,
			okText: t`Clear`,
			cancelText: t`Cancel`,
		},
		onOk: clearHistory,
	});

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
