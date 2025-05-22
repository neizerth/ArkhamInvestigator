import { getReferenceCardDifficulty } from "@entities/reference-card";
import { selectCurrentLanguage } from "@features/i18n";
import {
	selectReferenceCard,
	selectReferenceCardText,
	useAppSelector,
} from "@shared/lib";
import type { ViewProps } from "react-native";
import * as C from "./ScenarioReference.components";
import { getScenarioReferenceStyle } from "./getScenarioReferenceStyle";

export type ScenarioReferenceProps = ViewProps;

export const ScenarioReference = (props: ScenarioReferenceProps) => {
	const card = useAppSelector(selectReferenceCard);
	const language = useAppSelector(selectCurrentLanguage);

	const text = useAppSelector(selectReferenceCardText);

	const style = getScenarioReferenceStyle(language);

	if (!card || !text) {
		return;
	}

	const { icon = "book", name } = card;
	const dificulty = getReferenceCardDifficulty(text).toLocaleUpperCase();

	return (
		<C.Container {...props}>
			<C.ReferenceIcon icon={icon} />
			<C.Content style={style.content}>
				<C.Header style={style.header}>
					<C.TitleGroup>
						<C.TitleText style={style.titleText}>{name}</C.TitleText>
						<C.TitleUnderlineGroup style={style.underline}>
							<C.TitleUnderline />
							<C.TitleUnderline />
						</C.TitleUnderlineGroup>
					</C.TitleGroup>
					<C.Difficulty>
						<C.DifficultyText>{dificulty}</C.DifficultyText>
					</C.Difficulty>
				</C.Header>
				<C.Tokens />
			</C.Content>
		</C.Container>
	);
};
