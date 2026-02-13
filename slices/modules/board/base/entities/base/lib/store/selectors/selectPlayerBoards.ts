import { selectInvestigatorBoards } from "@modules/board/base/shared/lib";
import { selectDeviceNetworkId } from "@modules/core/network/shared/lib";
import { selectGameMode } from "@modules/game/shared/lib";
import { createSelector } from "@reduxjs/toolkit";

export const selectPlayerBoards = createSelector(
	[selectInvestigatorBoards, selectDeviceNetworkId, selectGameMode],
	(investigatorBoards, deviceNetworkId, gameMode) => {
		if (gameMode !== "multiplayer") {
			return investigatorBoards;
		}
		return investigatorBoards.filter(
			(board) => board.networkId === deviceNetworkId,
		);
	},
);
