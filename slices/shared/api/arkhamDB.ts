import type { ArkhamDBInvestigatorCard } from "@shared/model/api/game/arkhamDB";
import { pick } from "ramda";
import { loadJSON } from "./loadJSON";

export const loadArkhamDBInvestigatorTranslations = async (
	language: string,
) => {
	const subdomain = language === "en" ? "" : `${language}.`;
	const apiURL = `https://${subdomain}arkhamdb.com`;
	const qs = new URLSearchParams();

	qs.append("_format", "json");
	qs.append("q", "t:investigator");

	const response = await loadJSON<ArkhamDBInvestigatorCard[]>(
		`${apiURL}/api/public/cards/?${qs}`,
	);
	type Key = keyof ArkhamDBInvestigatorCard;

	const selectProps = pick<Key[]>([
		"code",
		"faction_code",
		"flavor",
		"name",
		"subname",
		"text",
		"traits",
	]);

	return response.map(selectProps);
};
