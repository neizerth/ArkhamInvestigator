import { selectInvestigatorBoardImages } from "@modules/board/base/shared/lib";
import { getSignatureImageUrl } from "@modules/signature/base/shared/api";
import { useAppSelector } from "@shared/lib";
import type { InvestigatorImage } from "@shared/model";
import { useEffect } from "react";
import { Image, Platform } from "react-native";

const includeGrayscale = Platform.OS === "ios";

const getUrls = (data: InvestigatorImage[]) =>
	data.flatMap(({ id }) => {
		const url = getSignatureImageUrl({
			code: id,
			type: "full",
		});

		if (!includeGrayscale) {
			return [url];
		}

		return [
			url,
			getSignatureImageUrl({
				code: id,
				type: "full",
				grayscale: true,
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
