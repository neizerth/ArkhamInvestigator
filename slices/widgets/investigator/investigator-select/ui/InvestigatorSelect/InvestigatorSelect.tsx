import { selectArtworkUrl } from "@modules/core/theme/shared/lib";
import { selectSignatureGroups } from "@modules/signature/base/shared/lib";
import {
	changeSelectedInvestigator,
	selectDisabledInvestigatorCodes,
	selectFactionFilter,
	selectSelectedInvestigatorCodes,
	selectSelectedInvestigatorCount,
	selectSelectedInvestigatorImages,
} from "@shared/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib/hooks";
import { splitIntoGroups } from "@shared/lib/util";
import type { InvestigatorSignatureGroup } from "arkham-investigator-data";
import { propEq } from "ramda";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { GestureDetector } from "react-native-gesture-handler";
import * as C from "./InvestigatorSelect.components";
import { useFactionSwipes } from "./useFactionSwipes";
import { useImageSize } from "./useImageSize";

export const InvestigatorSelect = () => {
	const dispatch = useAppDispatch();
	const factionFilterValue = useAppSelector(selectFactionFilter);
	const data = useAppSelector(selectSignatureGroups);
	const artworkUrl = useAppSelector(selectArtworkUrl);
	const { t } = useTranslation();

	const gesture = useFactionSwipes();

	const image = useImageSize();
	const { size } = image;

	const columns = artworkUrl ? image.columns : 1;

	const onChange = useCallback(
		(item: InvestigatorSignatureGroup) =>
			dispatch(changeSelectedInvestigator(item)),
		[dispatch],
	);

	const disabled = useAppSelector(selectDisabledInvestigatorCodes);
	const selected = useAppSelector(selectSelectedInvestigatorCodes);
	const selectedCount = useAppSelector(selectSelectedInvestigatorCount);
	const selectedImages = useAppSelector(selectSelectedInvestigatorImages);
	const factionFilter = factionFilterValue || "guardian";

	const filtered = data.filter(({ spoiler, faction_code }) => {
		if (factionFilter === "spoiler") {
			return spoiler === true;
		}
		return faction_code === factionFilter && !spoiler;
	});

	const official = filtered.filter(propEq(true, "official"));
	const fanMade = filtered.filter(propEq(false, "official"));

	const sections = [
		{
			data: splitIntoGroups(official, columns),
		},
		{
			title: t`Fan-made Investigators`,
			data: splitIntoGroups(fanMade, columns),
		},
	];

	return (
		<GestureDetector gesture={gesture}>
			<C.Container>
				<C.FactionSelect value={factionFilter} />
				<C.Content>
					<C.List
						sections={sections}
						onChange={onChange}
						size={size}
						disabled={disabled}
						selected={selected}
						selectedCount={selectedCount}
						selectedImages={selectedImages}
					/>
				</C.Content>
				<C.Footer />
			</C.Container>
		</GestureDetector>
	);
};
