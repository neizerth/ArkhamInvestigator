import { selectCurrentActualPropValue } from "@modules/board/base/shared/lib";
import { ArtworksFragment } from "@modules/core/theme/shared/ui";
import { useAppSelector } from "@shared/lib";
import type { InvestigatorSkillType } from "@shared/model";
import { range } from "ramda";
import type { ViewProps } from "react-native";
import * as C from "./Skill.components";
import { getSkillStyle } from "./Skill.styles";
import { useSkillGestures, useSkillRenderItem } from "./lib";
export type SkillProps = ViewProps & {
	width: number;
	height: number;
	type: InvestigatorSkillType;
};

const SKILL_RANGE = range(0, 21);

export const Skill = ({ width, height, type, ...props }: SkillProps) => {
	const value = useAppSelector(selectCurrentActualPropValue(type));

	const style = getSkillStyle(width);

	const { onPressIn, onPressOut, onLongPress, onChange, openModal, touching } =
		useSkillGestures({
			type,
			value,
		});

	const renderItem = useSkillRenderItem({
		width,
		type,
		touching,
	});

	const itemHeight = height;

	return (
		<C.Container {...props}>
			<C.Odds skillValue={value} />
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
