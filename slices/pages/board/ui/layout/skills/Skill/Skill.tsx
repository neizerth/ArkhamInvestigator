import { SkillsContext } from "@pages/board/config";
import {
	selectCurrentBoard,
	setCurrentStat,
	startSkillCheck,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import type { InvestigatorSkillType } from "@shared/model";
import type { PickerChangeEvent, PickerItemInfo } from "@widgets/picker";
import { range } from "ramda";
import { useCallback, useContext, useState } from "react";
import type { ViewProps } from "react-native";
import * as C from "./Skill.components";
import { getSkillStyle, getSkillValueStyle } from "./Skill.styles";

export type SkillProps = ViewProps & {
	type: InvestigatorSkillType;
};

const SKILL_RANGE = range(0, 21);

export const Skill = ({ type, ...props }: SkillProps) => {
	const box = useContext(SkillsContext);
	const dispatch = useAppDispatch();
	const { value, baseValue, isParallel } = useAppSelector(selectCurrentBoard);
	const [pressing, setPressing] = useState(false);
	const skillValue = value[type];
	const baseSkillValue = baseValue[type];

	const style = getSkillStyle({ box });

	const onPressIn = useCallback(() => {
		setPressing(true);
	}, []);

	const onPressOut = useCallback(() => {
		setPressing(false);
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

			const style = getSkillValueStyle({
				box,
				isParallel,
				value: item,
				baseValue: baseSkillValue,
			});

			return (
				<C.Value
					{...props}
					value={item}
					style={style.text}
					contentContainerStyle={style.container}
				/>
			);
		},
		[box, baseSkillValue, isParallel],
	);

	const itemHeight = box.height * 0.8;

	return (
		<C.Container {...props}>
			<C.Row>
				<C.ValueContainer style={style.valueContainer}>
					<C.Picker
						renderItem={renderItem}
						itemHeight={itemHeight}
						data={SKILL_RANGE}
						value={skillValue}
						onValueChanged={onChange}
						onPress={openModal}
						onPressIn={onPressIn}
						onPressOut={onPressOut}
						pressHapticPattern="clockTick"
					/>
				</C.ValueContainer>
			</C.Row>
			{pressing && <C.Background style={style.background} />}
		</C.Container>
	);
};
