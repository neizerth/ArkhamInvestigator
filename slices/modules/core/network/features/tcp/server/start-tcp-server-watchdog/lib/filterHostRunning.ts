import { setHostRunning } from "@modules/core/network/shared/lib";

export const filterHostRunning = (status: boolean) => (action: unknown) =>
	setHostRunning.match(action) && action.payload === status;
