import type { Translation } from "@features/i18n/model";

import en from "./en.json";
import de from "./de.json";
import es from "./es.json";
import fr from "./fr.json";
import it from "./it.json";
import ko from "./ko.json";
import pl from "./pl.json";
import pt from "./pt.json";
import ru from "./ru.json";
import vi from "./vi.json";
import zhCn from "./zh-cn.json";
import zh from "./zh.json";

export const translations: Record<string, Translation> = {
	en,
	ru,
	ko,
	zh,
	"zh-cn": zhCn,
	vi,
	de,
	es,
	fr,
	it,
	pl,
	pt,
};
