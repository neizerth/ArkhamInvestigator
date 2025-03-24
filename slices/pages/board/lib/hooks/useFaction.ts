import {
	selectCurrentBoard,
	setCurrentBoard,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import type { Faction } from "@shared/model";
import { useCallback } from "react";

export const useFaction = () => {
	const dispatch = useAppDispatch();
	const board = useAppSelector(selectCurrentBoard);

	const { investigator, currentRole, details } = board;
	const defaultFaction = investigator.faction_code as Faction;

	const roles = details.media?.roles || [];
	const canChangeRoles = roles.length > 0;

	const canChangeFaction = canChangeRoles;

	const faction = currentRole || defaultFaction;

	const nextRole = useCallback(() => {
		const index = roles.indexOf(faction);
		const nextIndex = (index + 1) % roles.length;
		const currentRole = roles[nextIndex];

		dispatch(
			setCurrentBoard({
				...board,
				currentRole,
			}),
		);
	}, [dispatch, faction, board, roles]);

	const nextFaction = useCallback(() => {
		if (canChangeRoles) {
			nextRole();
			return;
		}
		return false;
	}, [canChangeRoles, nextRole]);

	return {
		faction,
		canChangeFaction,
		nextFaction,
	};
};
