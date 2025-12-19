import { setCurrentActualPropValue } from "@modules/board/base/shared/lib";
import { startSkillCheck } from "@modules/board/skill-check/shared/lib";
import { startChaosBagReveal } from "@modules/chaos-bag/reveal/base/entities/lib/store/features/startReveal/startChaosBagReveal";
import type { PickerChangeEvent } from "@modules/core/control/entities/picker/model";
import { usePageLoader } from "@modules/core/router/shared/lib";
import { openArtworkModal } from "@modules/core/theme/entities/lib/store/features/openArtworkModal";
import { selectArtworksEnabled } from "@modules/core/theme/shared/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import type { InvestigatorSkillType } from "@shared/model";
import { useCallback, useState } from "react";

type UseSkillGesturesOptions = {
	type: InvestigatorSkillType;
	value: number;
};

export const useSkillGestures = ({ type, value }: UseSkillGesturesOptions) => {
	const dispatch = useAppDispatch();
	const artworksEnabled = useAppSelector(selectArtworksEnabled);

	const [touching, setTouching] = useState(false);

	const onPressIn = useCallback(() => {
		setTouching(true);
	}, []);

	const onLongPress = useCallback(() => {
		if (!artworksEnabled) {
			return;
		}
		dispatch(
			startChaosBagReveal({
				boardId: "current",
				type,
				value,
			}),
		);
		setTouching(false);
	}, [dispatch, type, value, artworksEnabled]);

	const onPressOut = useCallback(() => {
		setTouching(false);
	}, []);

	const onOpen = useCallback(() => {
		if (!artworksEnabled) {
			dispatch(openArtworkModal());
			return;
		}
		dispatch(startSkillCheck(type));
	}, [dispatch, type, artworksEnabled]);

	const [openModal] = usePageLoader(onOpen);

	const onChange = useCallback(
		({ value = 0 }: PickerChangeEvent) => {
			dispatch(
				setCurrentActualPropValue({
					prop: type,
					value,
				}),
			);
		},
		[dispatch, type],
	);

	return {
		onPressIn,
		onPressOut,
		onLongPress,
		onChange,
		openModal,
		touching,
	};
};
