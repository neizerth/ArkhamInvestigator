import type { ReducerPayload } from "@shared/model";
import type { NetworkOutcomeActionMeta } from "../../../model";
import { withRemoteMeta } from "./withRemoteMeta";

type Options = Omit<NetworkOutcomeActionMeta, "remote">;

export const createRemoteReducer = <R>(reducer: R, options: Options) => {
	return {
		reducer,
		prepare: withRemoteMeta<ReducerPayload<R>>(options),
	};
};
