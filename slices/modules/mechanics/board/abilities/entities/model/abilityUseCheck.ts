import type { AppSelector } from "@shared/model";

export type AbilityChecker = Record<string, AppSelector<boolean>>;
