import type { ArkhamDBInvestigatorCard } from "@shared/model/api/game/arkhamDB";
import { pick } from "ramda";
import { loadJSON } from "./loadJSON";

export const loadArkhamDBInvestigatorTranslations = async (
	language: string,
) => {
	const apiURL = `https://${language}.arkhamdb.com`;
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
