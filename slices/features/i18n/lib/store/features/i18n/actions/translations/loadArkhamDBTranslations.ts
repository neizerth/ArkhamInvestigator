import type { AppThunk } from "@shared/model";
import type { ArkhamDBInvestigatorCard } from "@shared/model/api/game/arkhamDB";

import { loadArkhamDBInvestigatorData } from "@shared/api";
import { selectInvestigatorSources } from "@shared/lib";
import { setInvestigatorTranslations } from "../../i18n";
import { updateBoardTranslations } from "./updateBoardTranslations";

export const loadArkhamDBTranslations =
	(language: string): AppThunk =>
	async (dispatch, getState) => {
		const state = getState();
		const source = selectInvestigatorSources(state);
		const translations = await loadArkhamDBInvestigatorData(language);

		const translationMap = getCardMap(translations);

		const data = source.map((item) => {
			const translation = translationMap.get(item.code);
			return translation || item;
		});

		dispatch(setInvestigatorTranslations(data));
		dispatch(updateBoardTranslations());
	};

const getCardMap = (data: ArkhamDBInvestigatorCard[]) =>
	data.reduce((target, card) => {
		target.set(card.code, card);
		return target;
	}, new Map());
