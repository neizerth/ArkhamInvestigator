import type { ActionCreator } from "@reduxjs/toolkit";
import type { AppThunk } from "@shared/lib/store";
import { goToPage } from "@shared/lib/store/effects";
import type { InvestigatorBoardStat } from "@shared/model";
import { createStatItem } from "../lib/signalItems";
import { setSkillCheckData, setSkillCheckType } from "../skillCheck";
import { routes } from "@shared/config";

export const startSkillCheck: ActionCreator<AppThunk> =
	(statType: InvestigatorBoardStat) => (dispatch) => {
		dispatch(setSkillCheckType(statType));
		dispatch(setSkillCheckData([createStatItem(statType)]));
		dispatch(goToPage(routes.skillCheck));
	};
