import { Storage } from "@modules/core/storage/shared/lib";
import type { Translation } from "../../model";

const key = "118n.translations";

export const StoreTranslation = {
	save: (data: Translation) =>
		Storage.save({
			key,
			data,
		}),
	load: () =>
		Storage.load<Translation>({
			key,
		}),
	exists: () =>
		Storage.has({
			key,
		}),
};
