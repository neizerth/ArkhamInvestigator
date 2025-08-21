import type { InvestigatorTokenValueModificationCallback as Callback } from "../../../shared/model";
import { CampaignTokenValues } from "./campaigns";
import { CustomContentTokenValues } from "./custom";
import { InvestigatorDecksTokenValues } from "./decks";

type TokenModifications = Partial<Record<string, Callback>>;

export const tokenValueModifications: TokenModifications = {
	...CampaignTokenValues,
	...CustomContentTokenValues,
	...InvestigatorDecksTokenValues,
};
