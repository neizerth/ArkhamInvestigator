import type { DeclenseCase } from "@modules/core/i18n/shared/model";
import type {
	InvestigatorSignatureGender as Gender,
	InvestigatorSignature,
} from "arkham-investigator-data";
import petrovich, { type PetrovichGender } from "petrovich";

export type DeclenseSignatureNameOptions = {
	signature: InvestigatorSignature;
	resultCase: DeclenseCase;
	language: string;
};

export const declenseSignatureName = (
	options: DeclenseSignatureNameOptions,
) => {
	const { signature, resultCase, language } = options;
	if (resultCase === "dative" && signature.dative_name) {
		return signature.dative_name;
	}
	if (language === "ru") {
		return declenseRU(options);
	}
	return signature.name;
};

const petrovichGenderMapping: Record<Gender, PetrovichGender> = {
	male: "male",
	female: "female",
	"non-binary": "androgynous",
};

export const declenseRU = (options: DeclenseSignatureNameOptions) => {
	const { signature } = options;
	const { name } = options.signature;
	const [first, last] = name.split(" ");

	const gender = petrovichGenderMapping[signature.gender];

	const result = petrovich(
		{
			first,
			last,
			gender,
		},
		options.resultCase,
	);

	return [result.first, result.last].join(" ");
};
