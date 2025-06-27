import type { InvestigatorTokenValueModificationCallback as Callback } from "../../model";
import { JimCulverTokenValues } from "./JimCulverTokenValues";

type TokenModifications = Partial<Record<string, Callback>>;

export const tokenValueModifications: TokenModifications = {
	...JimCulverTokenValues,
};
