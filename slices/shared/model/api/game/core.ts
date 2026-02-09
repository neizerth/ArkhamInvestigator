import type { Single } from "@shared/model";
import type { ArkhamDivider } from "arkham-divider-data";
import type { LocaleBuild } from "arkham-investigator-data";

type Core = ArkhamDivider.Core;

export type ArkhamIcon = Single<Core["icons"]>;
export type RulesItem = Single<LocaleBuild["rules"]>;

export type GameCoreData = Core;
