import { currentScenarioReferenceSize } from "../config";

export const refUnit = (value: number) =>
	Math.round((currentScenarioReferenceSize.width * value) / 100);
export const refPx = (value: number) => `${refUnit(value)}px`;
