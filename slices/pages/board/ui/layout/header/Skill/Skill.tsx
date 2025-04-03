import {
	selectBoardProp,
	selectCurrentStatBaseValue,
	selectCurrentStatValue,
	selectShowAdditionalInformation,
	setCurrentStat,
	signedNumber,
	startSkillCheck,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import type { InvestigatorSkillType } from "@shared/model";
import type { PickerChangeEvent, PickerItemInfo } from "@widgets/picker";
import { range } from "ramda";
import { useCallback, useState } from "react";
import type { ViewProps } from "react-native";
import * as C from "./Skill.components";
import { getSkillStyle, getSkillValueStyle } from "./Skill.styles";

export type SkillProps = ViewProps & {
	width: number;
	type: InvestigatorSkillType;
};

const SKILL_RANGE = range(0, 21);

export const Skill = ({ width, type, ...props }: SkillProps) => {
	const dispatch = useAppDispatch();
	const value = useAppSelector(selectCurrentStatValue(type));
	const baseValue = useAppSelector(selectCurrentStatBaseValue(type));
	const isParallel = useAppSelector(selectBoardProp("isParallel"));

	const showInfo = useAppSelector(selectShowAdditionalInformation);
	const [touching, setTouching] = useState(false);

	const style = getSkillStyle(width);

	const onPressIn = useCallback(() => {
		setTouching(true);
	}, []);

	const onPressOut = useCallback(() => {
		setTouching(false);
	}, []);

	const openModal = useCallback(() => {
		dispatch(startSkillCheck(type));
	}, [dispatch, type]);

	const onChange = useCallback(
		({ value }: PickerChangeEvent) => {
			dispatch(setCurrentStat(type, value));
		},
		[dispatch, type],
	);

	const renderItem = useCallback(
		(props: PickerItemInfo) => {
			const { item } = props;

			const diff = item - baseValue;
			const showDiff = diff !== 0 && touching;

			const value = showInfo ? signedNumber(diff) : item;

			const style = getSkillValueStyle({
				type,
				width,
				isParallel,
				value,
				signed: showInfo,
				baseValue: baseValue,
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
		[width, baseValue, isParallel, type, touching, showInfo],
	);

	const itemHeight = width * 1.7;

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
						pressHapticPattern="clockTick"
					/>
				</C.ValueContainer>
			</C.Row>
			{touching && <C.Background style={style.background} />}
		</C.Container>
	);
};
