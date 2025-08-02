import { <ModelName>Reducer } from "@modules/<ModelPath>";
import {
	handle<FTName | pascalcase>,
	type <FTName | pascalcase>Payload,
} from "./handle<FTName | pascalcase>";

export const <FTName>Reducer: <ModelName | pascalcase>Reducer<
	<FTName | pascalcase>Payload
> = (state, { payload }) => {
	handle<FTName | pascalcase>(state, payload);
};
