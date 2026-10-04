import { selectArtworksEnabled } from "@modules/core/theme/shared/lib";

import { selectScreenOrientationType } from "@modules/core/device/shared/lib";
import { toggleSelectedSignature } from "@modules/signature/signature-selection/entities/lib";
import {
	selectDisabledSignatureCodes,
	selectFactionFilter,
	selectSelectedSignatureCodes,
	selectSelectedSignatureImages,
	selectSelectedSignaturesCount,
} from "@modules/signature/signature-selection/shared/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib/hooks";
import type { InvestigatorSignatureGroup } from "arkham-investigator-data";
import { useCallback } from "react";
import { GestureDetector } from "react-native-gesture-handler";
import { FACTION_SELECT_ITEM_SIZE } from "../../config";
import * as C from "./SignatureSelect.components";
import { useSignatureSections } from "./lib";
import { useFactionSwipes } from "./useFactionSwipes";
import { useImageSize } from "./useImageSize";

export const SignatureSelect = () => {
	const dispatch = useAppDispatch();
	const factionFilterValue = useAppSelector(selectFactionFilter);
	const artworksEnabled = useAppSelector(selectArtworksEnabled);
	const orientationType = useAppSelector(selectScreenOrientationType);

	const gesture = useFactionSwipes();

	const image = useImageSize();
	const { size, columns } = image;

	const onChange = useCallback(
		(group: InvestigatorSignatureGroup) =>
			dispatch(
				toggleSelectedSignature({
					group,
					showDetails: artworksEnabled,
				}),
			),
		[dispatch, artworksEnabled],
	);

	const disabled = useAppSelector(selectDisabledSignatureCodes);
	const selected = useAppSelector(selectSelectedSignatureCodes);
	const selectedCount = useAppSelector(selectSelectedSignaturesCount);
	const selectedImages = useAppSelector(selectSelectedSignatureImages);
	const faction = factionFilterValue || "guardian";

	const sections = useSignatureSections({
		faction,
		artworksEnabled,
		columns,
	});

	const List = artworksEnabled ? C.PreviewList : C.List;

	const content = [
		<C.FactionSelect
			key={`faction-select-${orientationType}`}
			size={FACTION_SELECT_ITEM_SIZE}
			value={faction}
		/>,
		<C.Content key={`content-${orientationType}`}>
			<List
				sections={sections}
				onChange={onChange}
				size={size}
				disabled={disabled}
				selected={selected}
				selectedCount={selectedCount}
				selectedImages={selectedImages}
			/>
		</C.Content>,
	].sort((a, b) => {
		const aKey = a.key ?? "";
		const bKey = b.key ?? "";

		if (orientationType === "landscape") {
			return aKey.localeCompare(bKey);
		}

		return bKey.localeCompare(aKey);
	});

	return (
		<GestureDetector gesture={gesture}>
			<C.Container>
				{content}
				<C.Footer />
			</C.Container>
		</GestureDetector>
	);
};
