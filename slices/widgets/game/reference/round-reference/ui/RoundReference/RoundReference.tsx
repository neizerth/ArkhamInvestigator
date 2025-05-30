import { REMOVE_CLIPPED_SUBVIEWS } from "@shared/config";
import { useAppSelector, useScrollToIndex } from "@shared/lib";
import { Delay } from "@shared/ui";
import { useCallback, useRef } from "react";
import type { ListRenderItem, ViewProps } from "react-native";
import type { FlatList } from "react-native-gesture-handler";
import { selectTimingRules } from "../../lib";
import { getRoundPhases } from "../../lib";
import type { TimingPhase } from "../../model";
import * as C from "./RoundReference.components";

export type RoundReferenceProps = ViewProps;

export const RoundReference = (props: RoundReferenceProps) => {
	const item = useAppSelector(selectTimingRules);

	const ref = useRef<FlatList<TimingPhase>>(null);

	const renderItem: ListRenderItem<TimingPhase> = useCallback(({ item }) => {
		return <C.Phase phase={item} />;
	}, []);

	const scrollToTop = useScrollToIndex({
		ref,
		index: 0,
	});

	const phases = getRoundPhases(item);

	if (!item) {
		return;
	}

	const { title } = item;

	return (
		<C.Container {...props}>
			<C.Content>
				<C.Title>
					<C.TitleContent>{title}</C.TitleContent>
				</C.Title>
				<Delay delayMs={0}>
					<C.Phases
						ref={ref}
						data={phases}
						renderItem={renderItem}
						onStartReached={scrollToTop}
						keyboardShouldPersistTaps="always"
						removeClippedSubviews={REMOVE_CLIPPED_SUBVIEWS}
					/>
				</Delay>
			</C.Content>
		</C.Container>
	);
};
