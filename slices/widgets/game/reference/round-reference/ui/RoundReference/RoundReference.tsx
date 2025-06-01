import {
	type TimingPhase,
	selectRoundPhases,
	selectTimingRules,
	useTimingPhase,
	useTimingPhaseWizard,
} from "@features/game";
import { useAppSelector } from "@shared/lib";
import { Delay } from "@shared/ui";
import { useCallback } from "react";
import type { ListRenderItem, ViewProps } from "react-native";
import * as C from "./RoundReference.components";
import { usePhaseList } from "./hooks";

export type RoundReferenceProps = ViewProps;

export const RoundReference = (props: RoundReferenceProps) => {
	useTimingPhaseWizard();

	const item = useAppSelector(selectTimingRules);
	const phases = useAppSelector(selectRoundPhases);

	const { isPhaseOpen, openPhase, closePhase } = useTimingPhase();

	const { showActivePhase, activePhase, scrollToIndex, ...listProps } =
		usePhaseList();

	const renderItem: ListRenderItem<TimingPhase> = useCallback(
		({ item }) => {
			const open = isPhaseOpen(item.position);
			const onOpen = openPhase(item.position);
			const onClose = closePhase(item.position);

			return (
				<C.Phase phase={item} open={open} onOpen={onOpen} onClose={onClose} />
			);
		},
		[isPhaseOpen, openPhase, closePhase],
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
						{showActivePhase && (
							<C.ActivePhase
								phase={activePhase}
								onPress={scrollToIndex(activePhase.position - 1)}
							/>
						)}
						<C.Phases
							showsVerticalScrollIndicator={false}
							{...listProps}
							data={phases}
							renderItem={renderItem}
							keyboardShouldPersistTaps="always"
							removeClippedSubviews={false}
						/>
					</C.Body>
				</Delay>
			</C.Content>
		</C.Container>
	);
};
