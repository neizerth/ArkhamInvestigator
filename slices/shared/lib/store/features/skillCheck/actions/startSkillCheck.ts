import type { ActionCreator } from "@reduxjs/toolkit";
import type { AppThunk } from "@shared/model";
import type { InvestigatorBoardStat } from "@shared/model";
import { routes } from "../../../../../config";
import { goToPage } from "../../../effects";
import { createStatItem } from "../lib/signalItems";
import { setSkillCheckData, setSkillCheckType } from "../skillCheck";

export const startSkillCheck: ActionCreator<AppThunk> =
	(statType: InvestigatorBoardStat) => (dispatch) => {
		dispatch(setSkillCheckType(statType));
		dispatch(setSkillCheckData([createStatItem(statType)]));
		dispatch(goToPage(routes.skillCheck));
	};
