import { lazy } from "react";
import { delayValue } from "../util";

type LoadType = Parameters<typeof lazy>[0];
type ComponentType = Awaited<ReturnType<LoadType>>["default"];

export const delayRender = <T extends ComponentType>(
	Component: T,
	delayMs = 0,
) =>
	lazy(() =>
		delayValue(delayMs, {
			default: Component,
		}),
	);
