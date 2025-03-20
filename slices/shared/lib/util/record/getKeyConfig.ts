import { mergeDeepRight } from "ramda";

export type KeyConfig<T> = Record<string, T> & {
	default: T;
};

export const getKeyConfig =
	<T>(config: KeyConfig<T>) =>
	(key?: string) => {
		if (key && key in config) {
			if (config.default && config[key]) {
				return mergeDeepRight(config.default, config[key]) as T;
			}
			return config[key];
		}

		return config.default;
	};
