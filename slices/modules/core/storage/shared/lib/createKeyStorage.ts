import type { LoadParams } from "react-native-storage";
import type { StorageSaveParams } from "../model";
import { Storage } from "./Storage";

export const createKeyStorage = (key: string) => ({
	load(params: Omit<LoadParams, "key">) {
		return Storage.load({
			...params,
			key,
		});
	},
	save(params: Omit<StorageSaveParams, "key">) {
		return Storage.save({
			...params,
			key,
		});
	},
});
