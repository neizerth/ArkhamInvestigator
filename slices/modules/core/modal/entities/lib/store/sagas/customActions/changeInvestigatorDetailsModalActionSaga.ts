import { ModalActionId } from "@modules/core/modal/entities/config";
import { createCustomModalActionSaga } from "@modules/core/modal/shared/base/lib";
import { changeInvestigatorDetails } from "@shared/lib";

export const changeInvestigatorDetailsModalActionSaga =
	createCustomModalActionSaga({
		type: "thunk",
		actionId: ModalActionId.changeInvestigatorDetails,
		actionCreator: changeInvestigatorDetails,
	});
