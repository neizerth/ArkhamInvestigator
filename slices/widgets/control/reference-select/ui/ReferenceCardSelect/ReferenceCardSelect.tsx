import { useAppTranslation } from "@features/i18n";
import {
	selectReferenceCard,
	setReferenceCardCode,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import type { SelectItem } from "@shared/ui";
import type { ReferenceCard } from "arkham-investigator-data";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./ReferenceCardSelect.components";
import { useReferenceCards, useRenderItem } from "./hooks";

export type ReferenceCardSelectProps = ViewProps;

export const ReferenceCardSelect = (props: ReferenceCardSelectProps) => {
	const dispatch = useAppDispatch();
	const { t } = useAppTranslation();

	const renderReferenceItem = useRenderItem();
	const referenceCards = useReferenceCards();
	const referenceCard = useAppSelector(selectReferenceCard);

	const onReferenceCardSelect = useCallback(
		({ value }: SelectItem<ReferenceCard>) => {
			dispatch(setReferenceCardCode(value.code));
		},
		[dispatch],
	);

	if (referenceCards.length < 2) {
		return null;
	}

	return (
		<C.Select
			{...props}
			data={referenceCards}
			onChange={onReferenceCardSelect}
			label={t`Scenario reference`}
			placeholder={t`Choose an option`}
			value={referenceCard}
			renderItem={renderReferenceItem}
		/>
	);
};
