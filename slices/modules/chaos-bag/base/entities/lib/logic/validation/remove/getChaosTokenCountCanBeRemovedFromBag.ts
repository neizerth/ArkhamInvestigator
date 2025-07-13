import {
	type GetChaosTokenCountByTypeOptions,
	getChaosTokenCountByType,
} from "@modules/chaos-bag/base/shared/lib";

export type GetChaosTokenCountCanBeRemovedOptions =
	GetChaosTokenCountByTypeOptions;

export const getChaosTokenCountCanBeRemoved = getChaosTokenCountByType;
