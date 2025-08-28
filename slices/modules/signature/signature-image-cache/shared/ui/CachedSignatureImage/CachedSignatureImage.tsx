import { useAppSelector } from "@shared/lib";
import { omit, pick } from "ramda";
import { Image, type ImageProps } from "react-native";
import { selectSignatureCacheByCode } from "../../lib";
import type { SignatureImageCacheItem } from "../../model";

export type CachedSignatureImageProps = Omit<ImageProps, "source"> &
	Pick<SignatureImageCacheItem, "code" | "type"> & {
		grayscale?: boolean;
	};

const cachePropsList: (keyof CachedSignatureImageProps)[] = [
	"code",
	"type",
	"grayscale",
];

export const CachedSignatureImage = (props: CachedSignatureImageProps) => {
	const cacheProps = pick(cachePropsList, props);
	const restProps = omit(cachePropsList, props);

	const cache = useAppSelector(selectSignatureCacheByCode(cacheProps));

	if (!cache) {
		return;
	}

	const { uri } = cache;
	const source = { uri };

	return <Image {...restProps} source={source} />;
};
