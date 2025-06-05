import type { InvestigatorSignatureGender } from "arkham-investigator-data";
import RussianNouns from "russian-nouns-js";
import type { DeclenseCase } from "../../model";

const rne = new RussianNouns.Engine();
const { Case, Gender: RussianNounsGender } = RussianNouns;

type Gender = InvestigatorSignatureGender | "common";

type Options = {
	language: string;
	text: string;
	gender?: Gender;
	resultCase: DeclenseCase;
};

export const declenseNoun = (options: Options) => {
	if (options.language === "ru") {
		return declenseNounRu(options);
	}
	return options.text;
};

const rneGenders = {
	male: RussianNounsGender.MASCULINE,
	female: RussianNounsGender.FEMININE,
	common: RussianNounsGender.COMMON,
	"non-binary": RussianNounsGender.NEUTER,
};

const rneCases = {
	accusative: Case.ACCUSATIVE,
	dative: Case.DATIVE,
	genitive: Case.GENITIVE,
	instrumental: Case.INSTRUMENTAL,
	nominative: Case.NOMINATIVE,
	prepositional: Case.PREPOSITIONAL,
};

export const declenseNounRu = (options: Options) => {
	const { resultCase } = options;
	const [text, ...restWords] = options.text.split(" ");

	const rneCase = rneCases[resultCase];
	const gender = options.gender && rneGenders[options.gender];

	const result = rne.decline({ text, gender }, rneCase);

	return [result, ...restWords].join(" ");
};
