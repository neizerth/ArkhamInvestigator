import {
	useChaosBagEffects,
	useChaosBagTokenEffects,
} from "@modules/chaos-bag/effect/features/chaos-bag-effects";
import { selectCurrentRevealedToken } from "@modules/chaos-bag/reveal/modal/features/chaos-token-reveal-modal/lib";
import { selectChaosBagTokenValues } from "@modules/chaos-bag/value/entities/lib";
import { useAppSelector } from "@shared/lib";
import { compact } from "ramda-adjunct";
import { useTranslation } from "react-i18next";

export const getCurrentTokenEffect = () => {
	const { t } = useTranslation();
	const tokenValues = useAppSelector(selectChaosBagTokenValues("current"));

	const currentToken = useAppSelector(selectCurrentRevealedToken);
	const options = {
		boardId: "current" as const,
		tokenValues,
	};
	const effects = useChaosBagTokenEffects(options);

	const chaosBagEffects = useChaosBagEffects(options);

	if (!currentToken) {
		return;
	}

	const effect = effects[currentToken.type];

	if (currentToken.canceled) {
		const message =
			currentToken.canceled === "effect"
				? "chaosToken.canceled.effect"
				: "chaosToken.canceled";

		const translation = t(message, {
			effect,
		});
		return translation.trim();
	}

	const result = compact([effect, chaosBagEffects]).join("\n");

	return result;
};
