import { <ModelName>Reducer } from "@modules/<ModelPath>";
import {
	handle<FTName | capitalcase>,
	<FTName | capitalcase>Payload,
} from "./handleUnregisterSFXWorker";

export const <FTName>Reducer: <ModelName | capitalcase>Reducer<
	<FTName | capitalcase>Payload
> = (state, { payload }) => {
	handle<FTName | capitalcase>>(state, payload);
};
