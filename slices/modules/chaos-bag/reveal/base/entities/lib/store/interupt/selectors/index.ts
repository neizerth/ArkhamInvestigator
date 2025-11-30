import type { AppSelector } from "@shared/model";
import { ParallelFatherMateoRevealInterrupt } from "./ParallelFatherMateoRevealInterrupt";

export type InterruptData = {
	code: string;
	canInterrupt: boolean;
};

export const interruptSelectors: AppSelector<InterruptData>[] = [
	ParallelFatherMateoRevealInterrupt,
];
