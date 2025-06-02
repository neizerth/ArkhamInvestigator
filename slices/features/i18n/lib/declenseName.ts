import type { InvestigatorSignatureGender } from "arkham-investigator-data";
import petrovich, { type PetrovichCase, type PetrovichGender } from "petrovich";
import { DEFAULT_LANGUAGE, i18next } from "../config";

type Options = {
	name: string;
	gender: InvestigatorSignatureGender;
	resultCase: PetrovichCase;
};

export const declenseName = (options: Options) => {
	const language = i18next.language || DEFAULT_LANGUAGE;

	if (language === "ru") {
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
