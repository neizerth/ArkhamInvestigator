import { ModalActionId } from "@modules/core/modal/entities/config";
import { createCustomModalActionSaga } from "@modules/core/modal/shared/base/lib";
import { startNewGame } from "@shared/lib";

export const startNewGameModalActionSaga = createCustomModalActionSaga({
	type: "thunk",
	actionId: ModalActionId.changeInvestigatorDetails,
	actionCreator: startNewGame,
});
