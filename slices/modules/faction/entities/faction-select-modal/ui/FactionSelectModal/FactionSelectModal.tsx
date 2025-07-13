import { setBoardProp } from "@modules/board/base/shared/lib";
import { useHapticFeedback } from "@modules/core/haptic/shared/lib";
import { CustomModalId } from "@modules/core/modal/entities/base/config";
import { closeModal } from "@modules/core/modal/shared/base/lib";
import {
	selectAvailableFactions,
	selectCurrentFaction,
} from "@modules/mechanics/board/base/entities/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import type { Faction } from "@shared/model";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./FactionSelectModal.components";

export type FactionSelectModalProps = ViewProps;

export const FactionSelectModal = (props: FactionSelectModalProps) => {
	const dispatch = useAppDispatch();
	const factions = useAppSelector(selectAvailableFactions("current"));
	const selected = useAppSelector(selectCurrentFaction);
	const impactFeedback = useHapticFeedback("clockTick");

	const hide = useCallback(() => {
		dispatch(
			closeModal({
				source: "ui",
			}),
		);
		impactFeedback();
	}, [dispatch, impactFeedback]);

	const onPress = useCallback(
		(faction: Faction) => () => {
			dispatch(
				closeModal({
					source: "ui",
				}),
			);
			dispatch(
				setBoardProp({
					boardId: "current",
					prop: "currentRole",
					value: faction,
				}),
			);
		},
		[dispatch],
	);

	return (
		<C.Modal {...props} id={CustomModalId.factionSelect} onClose={hide}>
			<C.Content>
				{factions.map((faction) => (
					<C.Button
						key={faction}
						faction={faction}
						selected={selected === faction}
						onPress={onPress(faction)}
					/>
				))}
			</C.Content>
		</C.Modal>
	);
};
