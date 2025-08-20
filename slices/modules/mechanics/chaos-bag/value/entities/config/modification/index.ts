import type { InvestigatorTokenValueModificationCallback as Callback } from "../../../shared/model";
import { CampaignTokenValues } from "./campaigns";
import { CustomContentTokenValues } from "./custom";

type TokenModifications = Partial<Record<string, Callback>>;

export const tokenValueModifications: TokenModifications = {
	...CampaignTokenValues,
	...CustomContentTokenValues,
};
