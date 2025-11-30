import type { Defined, Single } from "@shared/model";
import type { LocaleBuild } from "arkham-investigator-data";

export type RulesEntry = Single<LocaleBuild["rules"]>;
export type RulesSection = Defined<RulesEntry["rules"]>[number];

export type RulesItem = Defined<RulesSection["rules"]>[number];
export type RulesItemData = Defined<RulesItem["rules"]>;

export type RulesItemStep = Single<RulesItemData>;
