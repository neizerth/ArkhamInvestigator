import { selectCurrentIsParallel } from "@modules/board/base/entities/base/lib";
import {
	selectAlwaysShowSkillModifiers,
	selectCurrentBasePropValue,
	selectShowAdditionalInformation,
} from "@modules/board/base/shared/lib";
import type {
	PickerItemInfo,
	PickerListRenderItem,
} from "@modules/core/control/entities/picker/model";
import { selectArtworksEnabled } from "@modules/core/theme/shared/lib";
import { signedNumber } from "@shared/lib";
import { useAppSelector } from "@shared/lib";
import type { InvestigatorSkillType } from "@shared/model";
import { useCallback } from "react";
import * as C from "../Skill.components";
import { getSkillValueStyle } from "../Skill.styles";

type UseSkillRenderItemOptions = {
	width: number;
	type: InvestigatorSkillType;
	touching: boolean;
};

export const useSkillRenderItem = ({
	width,
	type,
	touching,
}: UseSkillRenderItemOptions): PickerListRenderItem<number> => {
	const showInfo = useAppSelector(selectShowAdditionalInformation);
	const baseValue = useAppSelector(selectCurrentBasePropValue(type));
	const isParallel = useAppSelector(selectCurrentIsParallel);
	const showModifiers = useAppSelector(selectAlwaysShowSkillModifiers);
	const artworksEnabled = useAppSelector(selectArtworksEnabled);

	const renderItem = useCallback<PickerListRenderItem<number>>(
		(props: PickerItemInfo<number>) => {
			const { item } = props;

			const diff = item - baseValue;
			const showDiff = diff !== 0 && (touching || showModifiers) && !showInfo;

			const value = showInfo ? signedNumber(diff) : item;

			const style = getSkillValueStyle({
				type,
				width,
				isParallel,
				value,
				signed: showInfo,
				baseValue: baseValue,
				showIcon: artworksEnabled,
			});

			return (
				<C.ValueContainer>
					<C.Value
						{...props}
						value={value}
						style={style.text}
						contentContainerStyle={style.container}
					/>
					{showDiff && (
						<C.ValueDiff style={style.diffContainer}>
							<C.Diff
								value={signedNumber(diff)}
								style={style.diff}
								contentContainerStyle={style.container}
							/>
						</C.ValueDiff>
					)}
				</C.ValueContainer>
			);
		},
		[
			width,
			baseValue,
			isParallel,
			type,
			touching,
			showInfo,
			showModifiers,
			artworksEnabled,
		],
	);

	return renderItem;
};
