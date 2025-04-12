import type { ArkhamDBCard, ArkhamDBInvestigatorCard } from "@shared/model";
import { pick, propEq } from "ramda";
import { loadJSON } from "../lib/util/promise";

export const loadArkhamDBInvestigatorData = async (language = "en") => {
	const subdomain = language === "en" ? "" : `${language}.`;
	const apiURL = `https://${subdomain}arkhamdb.com`;
	const qs = new URLSearchParams();

	qs.append("_format", "json");
	qs.append("q", "t:investigator");

	const url = `${apiURL}/api/public/cards/?${qs}`;
	try {
		const response = await loadJSON<ArkhamDBCard[]>(url);

		const selectProps = pick<(keyof ArkhamDBInvestigatorCard)[]>([
			"code",
			"faction_code",
			"flavor",
			"name",
			"subname",
			"text",
			"traits",
		]);

		return response
			.filter(propEq("investigator", "type_code"))
			.map(selectProps);
	} catch (e) {
		return [];
	}
};
