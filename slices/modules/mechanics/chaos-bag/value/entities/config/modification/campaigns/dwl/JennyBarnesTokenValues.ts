import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import type {
	InvestigatorTokenValueModificationCallback as Callback,
	InvestigatorTokenValueModification,
} from "../../../../model";

const callback: Callback = ({ board }) => {
	const { value } = board;
	return {
		elderSign: value.resources,
	};
};

export const JennyBarnesTokenValues: InvestigatorTokenValueModification = {
	[InvesigatorCode.JennyBarnes.base]: callback,
	[InvesigatorCode.JennyBarnes.book]: callback,
};
