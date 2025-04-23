import {
	selectCurrentStatBaseValue,
	selectCurrentStatValue,
	selectIsParallel,
	selectShowAdditionalInformation,
	setCurrentStat,
	signedNumber,
	startSkillCheck,
	useAppDispatch,
	useAppSelector,
	usePageLoader,
} from "@shared/lib";
import type { InvestigatorSkillType } from "@shared/model";
import type {
	PickerChangeEvent,
	PickerItemInfo,
} from "@widgets/control/picker";
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
	const value = useAppSelector(selectCurrentStatValue(type));
	const baseValue = useAppSelector(selectCurrentStatBaseValue(type));
	const isParallel = useAppSelector(selectIsParallel);

	const showInfo = useAppSelector(selectShowAdditionalInformation);
	const [touching, setTouching] = useState(false);

	const style = getSkillStyle(width);

	const onPressIn = useCallback(() => {
		setTouching(true);
	}, []);

	const onPressOut = useCallback(() => {
		setTouching(false);
	}, []);

	const onOpen = useCallback(() => {
		dispatch(startSkillCheck(type));
	}, [dispatch, type]);

	const [openModal] = usePageLoader(onOpen);

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
					/>
				</C.ValueContainer>
				<C.IconContainer>
					<C.Icon
						skillType={type}
						style={style.icon}
						contentContainerStyle={style.iconContainer}
					/>
				</C.IconContainer>
			</C.Row>
			{touching && <C.Background style={style.background} />}
		</C.Container>
	);
};
