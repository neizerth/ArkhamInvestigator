import { clearChaosTokenValue } from "@modules/chaos-bag/value/shared/lib";
import {
	selectReferenceCard,
	setReferenceCardCode,
} from "@modules/stories/shared/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import type { SelectItem } from "@shared/ui";
import type { ReferenceCard } from "arkham-investigator-data";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import type { ViewProps } from "react-native";
import * as C from "./ReferenceCardSelect.components";
import { useReferenceCards, useRenderItem } from "./hooks";

export type ReferenceCardSelectProps = ViewProps;

export const ReferenceCardSelect = (props: ReferenceCardSelectProps) => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();

	const renderReferenceItem = useRenderItem();
	const referenceCards = useReferenceCards();
	const referenceCard = useAppSelector(selectReferenceCard);

	const onReferenceCardSelect = useCallback(
		({ value }: SelectItem<ReferenceCard>) => {
			dispatch(setReferenceCardCode(value.code));
			dispatch(clearChaosTokenValue());
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
