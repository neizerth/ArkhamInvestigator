import createHyphenator, { type PatternsDefinition } from "hyphen";
import de from "hyphen/patterns/de-1996";
import en from "hyphen/patterns/en-us";
import fr from "hyphen/patterns/fr";
import it from "hyphen/patterns/it";
import pl from "hyphen/patterns/pl";
import pt from "hyphen/patterns/pt";
import ru from "hyphen/patterns/ru";
import zh from "hyphen/patterns/zh-latn-pinyin";

const patternsMap: Record<string, PatternsDefinition> = {
	en,
	de,
	fr,
	it,
	pl,
	ru,
	pt,
	zh,
};

export const hyphenate = (text: string, language: string) => {
	const patterns = patternsMap[language];

	if (!patterns) {
		return Promise.resolve(text);
	}

	const hyphenate = createHyphenator(patterns, {
		async: true,
	});

	return hyphenate(text) as Promise<string>;
};
