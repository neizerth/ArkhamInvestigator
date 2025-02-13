import type { ArkhamDivider } from "arkham-divider-data";
import type { Single } from "@shared/model";

type Core = ArkhamDivider.Core;

export type Story = Single<Core['stories']>
export type EncounterSet = Single<Core['encounterSets']>
export type InvestigatorSource = Single<Story['investigators']>
export type ArkhamIcon = Single<Core['icons']>

export type GameCoreData = Core 