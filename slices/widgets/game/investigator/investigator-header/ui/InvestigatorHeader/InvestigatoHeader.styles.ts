import { scaleBox } from "@shared/lib";
import type { PropsWithBox } from "@shared/model";
import { skillsStyle } from "../../../investigator-skills";
import { titleStyle } from "../../../investigator-title";
import type { InvestiatorHeaderDirection } from "./InvestigatorHeader.types";
const { round: rnd } = Math;

type Options = {
	direction: InvestiatorHeaderDirection;
	gap: number;
};

export const getHeaderStyle = ({ direction, gap }: Options) => {
	return {
		flexDirection: direction,
		gap: direction === "column" ? gap : 0,
	};
};

export const getSkillsStyle = ({ direction, gap }: Options) => {
	return {
		marginLeft: direction === "row" ? -gap : 0,
	};
};

type SizeOptions = {
	width: number;
	direction: InvestiatorHeaderDirection;
	scale: number;
};

export const getScaledElement = ({
	direction,
	width,
	scale,
	box,
}: SizeOptions & PropsWithBox) => {
	const elementScale = direction === "column" ? width / box.width : scale;

	const scaled = scaleBox(box, elementScale);

	return {
		width: rnd(scaled.width),
		height: rnd(scaled.height),
	};
};

export const getSkillsSize = (options: SizeOptions) =>
	getScaledElement({
		...options,
		box: skillsStyle,
	});

export const getTitleSize = (options: SizeOptions) =>
	getScaledElement({
		...options,
		box: titleStyle,
	});
