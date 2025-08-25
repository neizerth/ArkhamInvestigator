import {
	selectShowDoom,
	selectShowScenarioClues,
	selectShowScenarioResources,
	setShowDescription,
} from "@modules/board/base/shared/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { Outside } from "@shared/ui";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import {
	ScenarioClues,
	ScenarioDoom,
	ScenarioResources,
} from "../../../../../../../shared";
import * as C from "./BoardDescriptionSecondaryControls.components";

export type BoardDescriptionSecondaryControlsProps = ViewProps;

export const BoardDescriptionSecondaryControls = (
	props: BoardDescriptionSecondaryControlsProps,
) => {
	const dispatch = useAppDispatch();
	const showDoom = useAppSelector(selectShowDoom);
	const showResources = useAppSelector(selectShowScenarioResources);
	const showClues = useAppSelector(selectShowScenarioClues);

	const noContent = !(showDoom || showResources || showClues);

	const close = useCallback(() => {
		dispatch(setShowDescription(false));
	}, [dispatch]);

	if (noContent) {
		return null;
	}

	return (
		<C.Container {...props}>
			<Outside onPress={close} />
			<C.Content>
				{showDoom && <ScenarioDoom visible />}
				{showResources && <ScenarioResources visible />}
				{showClues && <ScenarioClues visible />}
			</C.Content>
		</C.Container>
	);
};
