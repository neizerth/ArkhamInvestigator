import { getInvestigatorImageUrl } from "@shared/api";
import { selectBoardImages, useAppSelector } from "@shared/lib";
import { prop } from "ramda";
import { useEffect } from "react";
import { Image, Platform } from "react-native";

const includeGrayscale = Platform.OS === "ios";

const getUrls = (data: string[]) =>
	data.flatMap((code) => {
		const url = getInvestigatorImageUrl({
			code,
			type: "full",
		});

		if (!includeGrayscale) {
			return [url];
		}

		return [
			url,
			getInvestigatorImageUrl({
				code,
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
	const images = useAppSelector(selectBoardImages);
	const imageIds = images.map(prop("id"));

	useEffect(() => {
		const urls = getUrls(imageIds);
		prefetch(urls);
	}, [imageIds]);
};
