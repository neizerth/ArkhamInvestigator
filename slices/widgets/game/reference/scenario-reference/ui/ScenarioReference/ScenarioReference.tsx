import {
	selectReferenceCard,
	selectReferenceCardDifficulty,
	selectReferenceCardText,
	stripTags,
	useAppSelector,
} from "@shared/lib";
import type { ViewProps } from "react-native";
import * as C from "./ScenarioReference.components";
import { getScenarioReferenceStyle } from "./getScenarioReferenceStyle";

export type ScenarioReferenceProps = ViewProps;

export const ScenarioReference = (props: ScenarioReferenceProps) => {
	const card = useAppSelector(selectReferenceCard);
	const referenceDifficulty = useAppSelector(selectReferenceCardDifficulty);

	const text = useAppSelector(selectReferenceCardText);

	if (!card || !text) {
		return;
	}

	const { icon = "book", name } = card;

	const style = getScenarioReferenceStyle({
		language: card.locale,
		name,
	});
	const dificulty = stripTags(referenceDifficulty).toLocaleUpperCase();

	return (
		<C.Container {...props}>
			<C.ReferenceIconContainer>
				<C.ReferenceIcon icon={icon} scaleType="circle" />
			</C.ReferenceIconContainer>
			<C.Content style={style.content}>
				<C.Header style={style.header}>
					<C.Title style={style.titleText} underlineStyle={style.underline}>
						{name}
					</C.Title>
					<C.Difficulty>
						<C.DifficultyText>{dificulty}</C.DifficultyText>
					</C.Difficulty>
				</C.Header>
				<C.Body>
					<C.Tokens />
				</C.Body>
			</C.Content>
		</C.Container>
	);
};
