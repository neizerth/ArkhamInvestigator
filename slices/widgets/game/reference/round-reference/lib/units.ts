import { currentRoundReferenceSize } from "../config";

export const unit = (value: number) =>
	(currentRoundReferenceSize.width * value) / 100;

export const unitPx = (value: number) => `${unit(value)}px`;
