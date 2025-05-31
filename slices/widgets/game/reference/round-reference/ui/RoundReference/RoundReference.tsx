import { REMOVE_CLIPPED_SUBVIEWS } from "@shared/config";
import { useAppSelector, useScrollToIndex } from "@shared/lib";
import { Delay } from "@shared/ui";
import memoize from "fast-memoize";
import { equals, propEq, reject } from "ramda";
import { useCallback, useRef, useState } from "react";
import type { FlatListProps, ListRenderItem, ViewProps } from "react-native";
import type { FlatList } from "react-native-gesture-handler";
import { selectTimingRules } from "../../lib";
import { getRoundPhases } from "../../lib";
import type { TimingPhase } from "../../model";
import * as C from "./RoundReference.components";

export type RoundReferenceProps = ViewProps;

type List = FlatList<TimingPhase>;
type ListProps = FlatListProps<TimingPhase>;

type ViewableItemsCallback = Exclude<
	ListProps["onViewableItemsChanged"],
	undefined | null
>;

export const RoundReference = (props: RoundReferenceProps) => {
	const item = useAppSelector(selectTimingRules);

	const ref = useRef<List>(null);

	const scrollToTop = useScrollToIndex({
		ref,
		index: 0,
	});

	const phases = getRoundPhases(item);

	const [openPhases, setOpenPhases] = useState<number[]>([]);
	const [stickyPhase, setStickyPhase] = useState(phases[0]);

	const onViewableItemsChanged = useCallback<ViewableItemsCallback>(
		(info) => {
			const [first] = info.viewableItems.filter(propEq(true, "isViewable"));
			const { item } = first;
			if (stickyPhase.position === item.position) {
				return;
			}
			// setStickyPhase(item);
		},
		[stickyPhase],
	);

	const openPhase = useCallback(
		memoize((index: number) => () => {
			setOpenPhases((data) => [...data, index]);
		}),
		[],
	);

	const closePhase = useCallback(
		memoize((index: number) => () => {
			setOpenPhases((data) => reject(equals(index), data));
		}),
		[],
	);

	const renderItem: ListRenderItem<TimingPhase> = useCallback(
		({ item }) => {
			const open = openPhases.includes(item.position);
			return (
				<C.Phase
					phase={item}
					open={open}
					onOpen={openPhase(item.position)}
					onClose={closePhase(item.position)}
				/>
			);
		},
		[openPhases, openPhase, closePhase],
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
					<C.Phases
						ref={ref}
						data={phases}
						renderItem={renderItem}
						onStartReached={scrollToTop}
						// onViewableItemsChanged={onViewableItemsChanged}
						keyboardShouldPersistTaps="always"
						removeClippedSubviews={REMOVE_CLIPPED_SUBVIEWS}
					/>
				</Delay>
			</C.Content>
		</C.Container>
	);
};
