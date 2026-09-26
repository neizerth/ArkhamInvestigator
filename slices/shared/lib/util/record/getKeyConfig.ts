import { mergeDeepRight } from "ramda";

export type KeyConfig<T> = Record<string, T> & {
	default: T;
};

const resolveKey = (key: string, config: object) => {
	if (key in config) {
		return key;
	}

	const base = key.split("-")[0];

	if (base !== key && base in config) {
		return base;
	}

	return key;
};

export const getKeyConfig =
	<T>(config: KeyConfig<T>) =>
	(key?: string) => {
		const resolved = key && resolveKey(key, config);

		if (resolved && resolved in config) {
			if (config.default && config[resolved]) {
				return mergeDeepRight(config.default, config[resolved]) as T;
			}
			return config[resolved];
		}

		return config.default;
	};
