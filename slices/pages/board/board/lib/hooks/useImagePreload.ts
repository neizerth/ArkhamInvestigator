import { selectInvestigatorBoardImages } from "@modules/board/base/shared/lib";
import { getInvestigatorImageUrl } from "@shared/api";
import { useAppSelector } from "@shared/lib";
import type { InvestigatorImage } from "@shared/model";
import { useEffect } from "react";
import { Image, Platform } from "react-native";

const includeGrayscale = Platform.OS === "ios";

const getUrls = (data: InvestigatorImage[]) =>
	data.flatMap(({ id, version }) => {
		const url = getInvestigatorImageUrl({
			code: id,
			type: "full",
			version,
		});

		if (!includeGrayscale) {
			return [url];
		}

		return [
			url,
			getInvestigatorImageUrl({
				code: id,
				type: "full",
				grayscale: true,
				version,
			}),
		];
	});

const prefetch = async (data: string[]) => {
	for (const url of data) {
		await Image.prefetch(url);
	}
};

export const useImagePrelaod = () => {
	const images = useAppSelector(selectInvestigatorBoardImages);

	useEffect(() => {
		const urls = getUrls(images);
		prefetch(urls);
	}, [images]);
};
