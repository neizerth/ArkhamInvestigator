import type { ChaosBagHandler, ChaosBagTokenData } from "../../../../model";

export type HandleUpdateChaosTokenInternalPayload = {
	id: string;
	data: Partial<ChaosBagTokenData>;
};

export const handleUpdateChaosTokenInternal: ChaosBagHandler<
	HandleUpdateChaosTokenInternalPayload
> = (state, { id, data }) => {
	state.contents = state.contents.map((token) => {
		if (token.id === id) {
			return {
				...token,
				...data,
			};
		}

		return token;
	});
};
