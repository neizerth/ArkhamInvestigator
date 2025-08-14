import { always } from "ramda";
import type { LoadParams } from "react-native-storage";
import { storage } from "../config";
import type { StorageSaveParams } from "../model";

const catchError = always(void 0);

export const Storage = {
	load<T>(params: LoadParams) {
		return storage.load<T>(params).catch(catchError);
	},
	save(params: StorageSaveParams) {
		return storage.save(params);
	},
	has(params: LoadParams) {
		const exists = always(true);
		const notFound = always(false);

		return storage.load(params).then(exists).catch(notFound);
	},
};
