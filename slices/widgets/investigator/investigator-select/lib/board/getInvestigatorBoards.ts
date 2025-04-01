import { translateInvestigator } from "@features/i18n";
import {
	NEW_TURN_ACTIONS_COUNT,
	START_GAME_RESOURCES_COUNT,
} from "@shared/config";
import { getSelectedInvestigatorOptions } from "@shared/lib";
import { getBoardStats } from "@shared/lib/features/game/board/getBoardStats";
import type {
	InvestigatorBoard,
	InvestigatorSource,
	SelectedInvestigator,
} from "@shared/model";
import type { ArkhamDBInvestigatorCard } from "@shared/model/api/game/arkhamDB";
import type { Investigator as InvestigatorMedia } from "arkham-investigator-data";
import { isNotNil, propEq } from "ramda";

type GetInvestigatorBoards = {
	selectedInvestigators: SelectedInvestigator[];
	investigators: InvestigatorSource[];
	mediaItems: InvestigatorMedia[];
	investigatorTranslations?: ArkhamDBInvestigatorCard[];
};

export const getInvestigatorBoards = ({
	investigators,
	selectedInvestigators,
	mediaItems,
	investigatorTranslations = [],
}: GetInvestigatorBoards) =>
	selectedInvestigators
		.map((item, index): InvestigatorBoard | null => {
			const { details } = item;

			const media = mediaItems.find(propEq(item.code, "code"));

			if (!media) {
				return null;
			}

			const { picture, additionalAction, isParallel, code } =
				getSelectedInvestigatorOptions({
					selection: item,
					media,
					details,
				});

			const investigator = investigators.find(propEq(code, "code"));

			if (!investigator) {
				return null;
			}

			const unique = Boolean(!media.multiselect);

			const value = {
				...getBoardStats(investigator),
				additionalAction,
				resources: START_GAME_RESOURCES_COUNT,
				actions: NEW_TURN_ACTIONS_COUNT,
				clues: 0,
			};
			const id = index + 1;

			const investigatorTranslation = translateInvestigator(
				investigator,
				investigatorTranslations,
			);

			return {
				id,
				investigator: investigatorTranslation,
				picture,
				initialValue: value,
				baseValue: value,
				value,
				isParallel,
				unique,
				history: [],
				checkHistory: [],
				historyIndex: -1,
				details,
				selection: item,
			};
		})
		.filter(isNotNil);
