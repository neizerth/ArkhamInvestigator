import {
	type TimingPhase,
	selectOpenTimingPhases,
	selectRoundPhases,
	selectTimingRules,
	useTimingPhase,
} from "@features/game";
import {
	useAppDispatch,
	useAppSelector,
	useScrollSpy,
	useScrollToIndex,
} from "@shared/lib";
import { Delay } from "@shared/ui";
import { useCallback, useRef } from "react";
import type { ListRenderItem, ViewProps } from "react-native";
import type { FlatList } from "react-native-gesture-handler";
import * as C from "./RoundReference.components";
import { useActivePhase } from "./hooks";

export type RoundReferenceProps = ViewProps;

type List = FlatList<TimingPhase>;

export const RoundReference = (props: RoundReferenceProps) => {
	const dispatch = useAppDispatch();
	const item = useAppSelector(selectTimingRules);
	const phases = useAppSelector(selectRoundPhases);
	const openPhases = useAppSelector(selectOpenTimingPhases);

	const phaseController = useTimingPhase();

	const [showActivePhase, onScroll] = useActivePhase();
	const ref = useRef<List>(null);

	const scrollToTop = useScrollToIndex({
		ref,
		index: 0,
	});

	const [activePhase, onViewableItemsChanged] = useScrollSpy<TimingPhase>();

	const isPhaseOpen = useCallback(
		(id: number) => {
			return openPhases?.includes(id);
		},
		[openPhases],
	);

	const renderActivePhase =
		activePhase && isPhaseOpen(activePhase.position) && showActivePhase;

	const renderItem: ListRenderItem<TimingPhase> = useCallback(
		({ item }) => {
			const open = isPhaseOpen(item.position);
			return (
				<C.Phase
					phase={item}
					open={open}
					onOpen={phaseController.open(item.position)}
					onClose={phaseController.close(item.position)}
				/>
			);
		},
		[isPhaseOpen, phaseController],
	);

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
					<C.Body>
						{activePhase && renderActivePhase && (
							<C.ActivePhase phase={activePhase} />
						)}
						<C.Phases
							ref={ref}
							data={phases}
							renderItem={renderItem}
							onStartReached={scrollToTop}
							onScroll={onScroll}
							onViewableItemsChanged={onViewableItemsChanged}
							keyboardShouldPersistTaps="always"
							removeClippedSubviews={false}
						/>
					</C.Body>
				</Delay>
			</C.Content>
		</C.Container>
	);
};
