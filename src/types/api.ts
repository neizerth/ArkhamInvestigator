import { ArkhamDivider } from "arkham-divider-data";
import { Single } from "./common";

type Icons = ArkhamDivider.Core['icons'];
type Stories = ArkhamDivider.Core['stories'];
type Investigators = IStory['investigators'];
 
export type IIcon = Single<Icons>;
export type IStory = Single<Stories>;
export type IInvestigator = Single<Investigators>;