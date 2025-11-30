import { v4 } from "uuid";
import type { RevealedChaosBagToken } from "../../../shared/model";

type Token = Omit<RevealedChaosBagToken, "revealId" | "sealed" | "sealData">;

export const createRevealedToken = (token: Token): RevealedChaosBagToken => {
	return {
		...token,
		revealId: v4(),
	};
};
