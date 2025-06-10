import type { InvestigatorSignatureGender } from "arkham-investigator-data";
import petrovich, { type PetrovichGender } from "petrovich";
import type { DeclenseCase } from "../../../model";

type Options = {
	name: string;
	gender: InvestigatorSignatureGender;
	resultCase: DeclenseCase;
	language: string;
};

export const declenseName = (options: Options) => {
	if (options.language === "ru") {
		return declenseNameRU(options);
	}
	return options.name;
};

const petrovichGenderMapping: Record<
	InvestigatorSignatureGender,
	PetrovichGender
> = {
	male: "male",
	female: "female",
	"non-binary": "androgynous",
};

export const declenseNameRU = (options: Options) => {
	const [first, last] = options.name.split(" ");

	const gender = petrovichGenderMapping[options.gender];

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
