import type { ChangeBoardEventPayload as Payload } from "@modules/board/base/shared/model";
import type { PayloadAction } from "@reduxjs/toolkit";

type MatchCallback<
	P extends Payload,
	T extends string,
	M = never,
	E = never,
> = (action: unknown) => action is PayloadAction<P, T, M, E>;

export const withHistoryAction =
	<P extends Payload, T extends string, M = never, E = never>(
		match: MatchCallback<P, T, M, E>,
	) =>
	(action: unknown): action is PayloadAction<P, T, M, E> => {
		if (!match(action)) {
			return false;
		}

		const { history = true } = action.payload;

		return history;
	};
