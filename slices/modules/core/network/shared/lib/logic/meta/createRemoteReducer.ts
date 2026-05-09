import { hasProp } from "@shared/lib";
import type { ReducerPayload } from "@shared/model";
import type { NetworkOutcomeActionMeta } from "../../../model";

type Options = Omit<NetworkOutcomeActionMeta, "remote">;

const getRemoteValue = (payload: unknown) => {
	return hasProp(payload, "remote") ? payload.remote : true;
};

export const createRemoteReducer = <R>(reducer: R, options: Options) => {
	return {
		reducer,
		prepare: (payload: ReducerPayload<R>) => ({
			payload,
			meta: {
				...options,
				remote: getRemoteValue(payload),
			},
		}),
	};
};
