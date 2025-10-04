import { DEFAULT_LANGUAGE } from "@modules/core/i18n/shared/config";
import { selectCurrentLanguage } from "@modules/core/i18n/shared/lib";
import { fillChaosBagDifficulty } from "@modules/stories/entities/lib";
import {
	selectReferenceCard,
	selectReferenceCardText,
	selectShowFanMadeStories,
	selectShowTranslatedOnlyStories,
	selectStoryDifficulty,
	setShowFanMadeStories,
	setShowTranslatedOnlyStories,
} from "@modules/stories/shared/lib";
import { useAppDispatch, useAppSelector, useBoolean } from "@shared/lib";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import type { ViewProps } from "react-native";
import * as C from "./ReferenceSelect.components";

export type ReferenceSelectProps = ViewProps & {
	onClose?: () => void;
};
export const ReferenceSelect = ({
	onClose,
	...props
}: ReferenceSelectProps) => {
	const dispatch = useAppDispatch();
	const language = useAppSelector(selectCurrentLanguage);
	const referenceCard = useAppSelector(selectReferenceCard);
	const referenceCardText = useAppSelector(selectReferenceCardText);

	const [fillChaosBag, setFillChaosBag] = useBoolean(false);

	const difficulty = useAppSelector(selectStoryDifficulty);

	const { t } = useTranslation();

	const isDefaultLanguage = language === DEFAULT_LANGUAGE;

	const close = useCallback(() => {
		if (fillChaosBag && difficulty) {
			const difficultyId = difficulty.id;
			dispatch(fillChaosBagDifficulty({ difficultyId }));
		}
		onClose?.();
	}, [dispatch, fillChaosBag, onClose, difficulty]);

	return (
		<C.Container {...props}>
			<C.Body>
				<C.Content>
					<C.Header>
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
					</C.Header>
					<C.ScrollArea>
						<C.StorySelect />
						<C.CardSelect />
						{referenceCard && <C.DifficultySelect />}
						{difficulty && (
							<>
								<C.DifficultyTokens />
								<C.Check
									label={t`Fill Chaos Bag`}
									checked={fillChaosBag}
									onPress={setFillChaosBag.toggle}
								/>
							</>
						)}

						{referenceCardText && (
							<C.ReferencePreview>
								<C.ReferenceText value={referenceCardText} />
							</C.ReferencePreview>
						)}
					</C.ScrollArea>
				</C.Content>
			</C.Body>
			{onClose && (
				<C.Actions>
					<C.Close text={t`Continue`} icon="check" onPress={close} />
				</C.Actions>
			)}
		</C.Container>
	);
};
