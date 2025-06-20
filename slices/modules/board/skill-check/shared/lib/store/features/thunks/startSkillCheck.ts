import type { ActionCreator } from "@reduxjs/toolkit";
import { routes } from "@shared/config";
import { goToPage } from "@shared/lib";
import type { AppThunk } from "@shared/model";
import type { InvestigatorBoardNumericStat } from "@shared/model";
import { sendCommandSignal, setSkillCheckType } from "../skillCheck";

export const startSkillCheck: ActionCreator<AppThunk> =
	(statType: InvestigatorBoardNumericStat) => (dispatch) => {
		dispatch(setSkillCheckType(statType));
		dispatch(sendCommandSignal("clear"));
		dispatch(goToPage(routes.skillCheck));
	};
