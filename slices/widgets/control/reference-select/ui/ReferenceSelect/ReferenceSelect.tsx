import { getReferenceCardText } from "@entities/reference-card";
import {
	DEFAULT_LANGUAGE,
	selectCurrentLanguage,
	useAppTranslation,
} from "@features/i18n";
import {
	selectReferenceCard,
	selectReferenceCardText,
	selectShowFanMadeStories,
	selectShowReferenceBackText,
	selectShowTranslatedOnlyStories,
	setShowFanMadeStories,
	setShowReferenceBackText,
	setShowTranslatedOnlyStories,
	useAppSelector,
} from "@shared/lib";
import type { ViewProps } from "react-native";
import * as C from "./ReferenceSelect.components";
import { useReferenceCardData } from "./hooks";

export type ReferenceSelectProps = ViewProps;
export const ReferenceSelect = (props: ReferenceSelectProps) => {
	const language = useAppSelector(selectCurrentLanguage);
	const referenceCard = useAppSelector(selectReferenceCard);
	const referenceCardText = useAppSelector(selectReferenceCardText);

	const referenceTexts = useReferenceCardData();

	const referenceText =
		referenceCardText && getReferenceCardText(referenceCardText);

	const { t } = useAppTranslation();

	const isDefaultLanguage = language === DEFAULT_LANGUAGE;

	return (
		<C.Container {...props}>
			<C.Content>
				{!isDefaultLanguage && (
					<C.Checkbox
						label={t`Translated content`}
						actionCreator={setShowTranslatedOnlyStories}
						selector={selectShowTranslatedOnlyStories}
					/>
				)}
				<C.Checkbox
					label={t`Fan-made Scenarios`}
					actionCreator={setShowFanMadeStories}
					selector={selectShowFanMadeStories}
				/>
				<C.StorySelect />
				<C.CardSelect />
				{referenceCard && (
					<>
						<C.StoreSelect
							label={t`Difficulty`}
							data={referenceTexts}
							actionCreator={setShowReferenceBackText}
							selector={selectShowReferenceBackText}
						/>
						{referenceText && <C.ReferenceText value={referenceText} />}
					</>
				)}
			</C.Content>
		</C.Container>
	);
};
