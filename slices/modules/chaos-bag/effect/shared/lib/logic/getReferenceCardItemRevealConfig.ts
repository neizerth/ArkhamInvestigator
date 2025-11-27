import type { ReferenceCardToken } from "arkham-investigator-data";

export const getReferenceCardItemRevealConfig = (item: ReferenceCardToken) => {
	switch (item.type) {
		case "value":
		case "select":
			return item.config.reveal_another ?? 0;
		case "counter":
			return item.reveal_another ?? 0;
	}
};
