import type { Single } from "@shared/model";
import type { ArkhamDivider } from "arkham-divider-data";

type Core = ArkhamDivider.Core;

export type Story = Single<Core["stories"]>;
export type EncounterSet = Single<Core["encounterSets"]>;
export type ArkhamIcon = Single<Core["icons"]>;

export type GameCoreData = Core;
