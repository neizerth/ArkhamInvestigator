import type { Story } from "@modules/stories/shared/model";
import type { SelectItem } from "@shared/ui";
import type { ReferenceCard } from "arkham-investigator-data";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import type { ViewProps } from "react-native";
import * as C from "./ReferenceCardSelect.components";
import { useReferenceCards, useRenderItem } from "./hooks";

export type ReferenceCardSelectProps = ViewProps & {
	value?: ReferenceCard | null;
	story?: Story | null;
	onChange?: (story: ReferenceCard) => void;
};

export const ReferenceCardSelect = ({
	value,
	story,
	onChange,
	...props
}: ReferenceCardSelectProps) => {
	const { t } = useTranslation();

	const renderReferenceItem = useRenderItem();
	const referenceCards = useReferenceCards(story);

	const onReferenceCardSelect = useCallback(
		({ value }: SelectItem<ReferenceCard>) => {
			onChange?.(value);
			// dispatch(setReferenceCardCode(value.code));
			// dispatch(clearChaosTokenValue());
		},
		[onChange],
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
			value={value}
			renderItem={renderReferenceItem}
		/>
	);
};
