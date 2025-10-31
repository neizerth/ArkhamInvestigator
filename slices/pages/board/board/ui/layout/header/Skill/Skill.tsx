import { selectCurrentIsParallel } from "@modules/board/base/entities/base/lib";
import {
	selectAlwaysShowSkillModifiers,
	selectCurrentActualPropValue,
	selectCurrentBasePropValue,
	setCurrentActualPropValue,
} from "@modules/board/base/shared/lib";
import { startSkillCheck } from "@modules/board/skill-check/shared/lib";
import { startChaosBagReveal } from "@modules/chaos-bag/reveal/base/entities/lib/store/features/startReveal/startChaosBagReveal";
import type {
	PickerChangeEvent,
	PickerItemInfo,
} from "@modules/core/control/entities/picker/model";
import { usePageLoader } from "@modules/core/router/shared/lib";
import { openArtworkModal } from "@modules/core/theme/entities/lib/store/features/openArtworkModal";
import { selectArtworksEnabled } from "@modules/core/theme/shared/lib";
import { ArtworksFragment } from "@modules/core/theme/shared/ui";
import {
	selectShowAdditionalInformation,
	signedNumber,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import type { InvestigatorSkillType } from "@shared/model";
import { range } from "ramda";
import { useCallback, useState } from "react";
import type { ViewProps } from "react-native";
import * as C from "./Skill.components";
import { getSkillStyle, getSkillValueStyle } from "./Skill.styles";

export type SkillProps = ViewProps & {
	width: number;
	height: number;
	type: InvestigatorSkillType;
};

const SKILL_RANGE = range(0, 21);

export const Skill = ({ width, height, type, ...props }: SkillProps) => {
	const dispatch = useAppDispatch();
	const value = useAppSelector(selectCurrentActualPropValue(type));
	const baseValue = useAppSelector(selectCurrentBasePropValue(type));
	const isParallel = useAppSelector(selectCurrentIsParallel);

	const showInfo = useAppSelector(selectShowAdditionalInformation);
	const showModifiers = useAppSelector(selectAlwaysShowSkillModifiers);
	const artworksEnabled = useAppSelector(selectArtworksEnabled);

	const [touching, setTouching] = useState(false);

	const style = getSkillStyle(width);

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

	const renderItem = useCallback(
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

	const itemHeight = height;

	return (
		<C.Container {...props}>
			<C.Row>
				<C.ValueContainer style={style.valueContainer}>
					<C.Picker
						renderItem={renderItem}
						itemHeight={itemHeight}
						data={SKILL_RANGE}
						value={value}
						onValueChanged={onChange}
						onPress={openModal}
						onPressIn={onPressIn}
						onPressOut={onPressOut}
						onLongPress={onLongPress}
					/>
				</C.ValueContainer>
				<ArtworksFragment>
					<C.IconContainer>
						<C.Icon
							skillType={type}
							style={style.icon}
							contentContainerStyle={style.iconContainer}
						/>
					</C.IconContainer>
				</ArtworksFragment>
			</C.Row>
			{touching && <C.Background style={style.background} />}
		</C.Container>
	);
};
