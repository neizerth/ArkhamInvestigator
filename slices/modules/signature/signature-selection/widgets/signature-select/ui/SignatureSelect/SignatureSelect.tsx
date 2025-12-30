import { selectArtworksEnabled } from "@modules/core/theme/shared/lib";

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
import * as C from "./SignatureSelect.components";
import { useData } from "./useData";
import { useFactionSwipes } from "./useFactionSwipes";
import { useImageSize } from "./useImageSize";

export const SignatureSelect = () => {
	const dispatch = useAppDispatch();
	const factionFilterValue = useAppSelector(selectFactionFilter);
	const artworksEnabled = useAppSelector(selectArtworksEnabled);

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

	const sections = useData({
		faction,
		artworksEnabled,
		columns,
	});

	const List = artworksEnabled ? C.PreviewList : C.List;

	return (
		<GestureDetector gesture={gesture}>
			<C.Container>
				<C.FactionSelect value={faction} />
				<C.Content>
					<List
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
