import { DEFAULT_LANGUAGE } from "@modules/core/i18n/shared/config";
import { selectCurrentLanguage } from "@modules/core/i18n/shared/lib";
import {
	selectReferenceCard,
	selectReferenceCardText,
	selectShowFanMadeStories,
	selectShowReferenceBackText,
	selectShowTranslatedOnlyStories,
	setShowFanMadeStories,
	setShowReferenceBackText,
	setShowTranslatedOnlyStories,
} from "@modules/stories/shared/lib";
import { useAppSelector } from "@shared/lib";
import { useTranslation } from "react-i18next";
import type { ViewProps } from "react-native";
import * as C from "./ReferenceSelect.components";
import { useReferenceCardData } from "./hooks";

export type ReferenceSelectProps = ViewProps & {
	onClose?: () => void;
};
export const ReferenceSelect = ({
	onClose,
	...props
}: ReferenceSelectProps) => {
	const language = useAppSelector(selectCurrentLanguage);
	const referenceCard = useAppSelector(selectReferenceCard);
	const referenceCardText = useAppSelector(selectReferenceCardText);

	const referenceTexts = useReferenceCardData();

	const { t } = useTranslation();

	const isDefaultLanguage = language === DEFAULT_LANGUAGE;

	return (
		<C.Container {...props}>
			<C.Body>
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
						<C.StoreSelect
							label={t`Difficulty`}
							data={referenceTexts}
							actionCreator={setShowReferenceBackText}
							selector={selectShowReferenceBackText}
						/>
					)}

					{referenceCardText && (
						<C.ReferencePreview>
							<C.ReferenceText value={referenceCardText} />
						</C.ReferencePreview>
					)}
				</C.Content>
			</C.Body>
			{onClose && (
				<C.Actions>
					<C.Close text={t`Continue`} icon="check" onPress={onClose} />
				</C.Actions>
			)}
		</C.Container>
	);
};
