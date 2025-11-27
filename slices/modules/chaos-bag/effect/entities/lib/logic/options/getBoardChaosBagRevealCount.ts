import { chaosToken } from "@modules/chaos-bag/base/shared/config";
import { defaultChaosTokenRevealCount } from "@modules/chaos-bag/effect/shared/config";
import { getReferenceCardItemRevealConfig } from "@modules/chaos-bag/effect/shared/lib";
import type { ChaosTokenRevealCount } from "../../../model";
import type { mapChaosTokenOptions } from "./mapChaosTokenOptions";

type OptionMap = ReturnType<typeof mapChaosTokenOptions>;

export const getBoardChaosBagRevealCount = (tokenOptionMap: OptionMap) => {
	return chaosToken.types.all.reduce<ChaosTokenRevealCount>((acc, type) => {
		const typeItem = tokenOptionMap[type];

		if (!typeItem) {
			acc[type] = defaultChaosTokenRevealCount[type] ?? 0;
			return acc;
		}

		const { option, item } = typeItem;

		const defaultCount = getReferenceCardItemRevealConfig(item);

		acc[type] = option?.modified_value.reveal_another ?? defaultCount;
		return acc;
	}, {} as ChaosTokenRevealCount);
};
