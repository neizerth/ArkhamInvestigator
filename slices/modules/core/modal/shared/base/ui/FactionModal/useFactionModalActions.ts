import { processModalAction } from "@modules/core/modal/shared/base/lib";
import type { BaseModalAction } from "@modules/core/modal/shared/base/model";
import type { FactionCardAction } from "@modules/faction/shared/faction-card";
import { useAppDispatch } from "@shared/lib";
import { useMemo } from "react";

export function useFactionModalActions<Action extends BaseModalAction>(
	actions: Action[],
) {
	const dispatch = useAppDispatch();

	return useMemo(() => {
		return actions.map(
			(modalAction): FactionCardAction => ({
				...modalAction,
				onPress: () =>
					dispatch(
						processModalAction({
							modalAction,
						}),
					),
			}),
		);
	}, [actions, dispatch]);
}
