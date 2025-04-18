import { Asset } from "expo-asset";
import { isNotNil, prop } from "ramda";
import { useEffect, useState } from "react";
import type { ImageSourcePropType } from "react-native";
export const useSource = (source?: ImageSourcePropType) => {
	const [data, setData] = useState<Asset[]>([]);

	useEffect(() => {
		const sources = getSource(source);
		const uris = sources.map(prop("uri")).filter(isNotNil);
		Asset.loadAsync(uris).then(setData);
	}, [source]);

	return data;
};

export const getSource = (source?: ImageSourcePropType) => {
	if (Array.isArray(source)) {
		return source.filter(({ uri }) => Boolean(uri));
	}
	if (typeof source === "object" && source.uri) {
		return [source];
	}

	return [];
};
