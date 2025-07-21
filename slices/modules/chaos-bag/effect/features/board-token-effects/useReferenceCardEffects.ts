import type { ChaosTokenValues } from "@modules/chaos-bag/base/shared/model";
import { selectCurrentLanguage } from "@modules/core/i18n/shared/lib";
import { selectReferenceCardTokens, useAppSelector } from "@shared/lib";
import { selectReferenceCardEffects } from "../../entities/lib";

type Options = {
	tokenValues: ChaosTokenValues;
};

export const useReferenceCardEffects = ({ tokenValues }: Options) => {
	const effects = useAppSelector(selectReferenceCardEffects);
	const tokens = useAppSelector(selectReferenceCardTokens);

	const language = useAppSelector(selectCurrentLanguage);

	return;
};
