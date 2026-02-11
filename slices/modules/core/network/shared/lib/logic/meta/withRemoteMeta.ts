import { withActionMeta } from "@shared/lib";
import type { NetworkOutcomeActionMeta } from "../../../model";

type Options = Omit<NetworkOutcomeActionMeta, "remote">;

export const withRemoteMeta = <T = void>(options: Options) =>
	withActionMeta<T, NetworkOutcomeActionMeta>({ ...options, remote: true });
