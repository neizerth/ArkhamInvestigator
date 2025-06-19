import type { InvestigatorBoardValueProp as PropType } from "@modules/board/base/shared/model";
import { type PayloadActionCreator, createAction } from "@reduxjs/toolkit";
import { capitalize } from "@shared/lib";
import type { InvestigatorNumericStat } from "@shared/model";

type Options<T extends PropType, P extends string> = {
	type: T;
	prefix: P;
};

type Id<
	T extends PropType,
	P extends string,
> = `${Capitalize<P>}${Capitalize<T>}Prop`;

type Actions = "set" | "increase" | "decrease";

type ActionPayload = {
	prop: InvestigatorNumericStat;
	value: number;
};

type ReturnType<T extends PropType, P extends string> = {
	[K in Actions as K extends string
		? `${K}${Id<T, P>}`
		: never]: PayloadActionCreator<ActionPayload>;
};

export const createBoardValueActions = <T extends PropType, P extends string>({
	type,
	prefix,
}: Options<T, P>) => {
	type Payload = ActionPayload;
	const id = `${capitalize(prefix)}${capitalize(type)}`;

	const setId = `set${id}Prop`;
	const increaseId = `increase${id}Prop`;
	const decreaseId = `decrease${id}Prop`;

	return {
		[setId]: createAction<Payload>(setId),
		[increaseId]: createAction<Payload>(increaseId),
		[decreaseId]: createAction<Payload>(decreaseId),
	} as ReturnType<T, P>;
};
