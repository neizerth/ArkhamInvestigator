import { font } from "@shared/config";

export const phaseTitleScale = 23 / 18;

export const roundReferenceTitleScale = 50 / 18;

export const phaseContentFontSize = font.size.small;

export const phaseTitleFontSize = phaseContentFontSize * phaseTitleScale;

export const phaseReferenceTitleFontSize =
	phaseContentFontSize * roundReferenceTitleScale;
