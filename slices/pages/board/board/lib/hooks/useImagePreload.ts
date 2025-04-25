import { getInvestigatorImageUrl } from "@shared/api";
import { selectBoardImages, useAppSelector } from "@shared/lib";
import { Image } from "expo-image";
import { prop } from "ramda";
import { useEffect } from "react";
import { Platform } from "react-native";

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

export const useImagePrelaod = () => {
	const images = useAppSelector(selectBoardImages);
	const imageIds = images.map(prop("id"));

	useEffect(() => {
		const urls = getUrls(imageIds);
		Image.prefetch(urls);
	}, [imageIds]);
};
