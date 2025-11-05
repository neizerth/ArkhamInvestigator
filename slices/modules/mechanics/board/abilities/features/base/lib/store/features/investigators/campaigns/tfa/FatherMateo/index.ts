import type { AbilityChecker } from "@modules/mechanics/board/abilities/entities/model";
import { ParallelFatherMateoAbilityChecker } from "./parallel/fastUseChecker";

export const FatherMateoAbilityChecker: AbilityChecker = {
	...ParallelFatherMateoAbilityChecker,
};
