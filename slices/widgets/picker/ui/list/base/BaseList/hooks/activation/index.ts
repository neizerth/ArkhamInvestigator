import { pipe } from "ramda";
import { useActivation } from "./useActivation";
import { useUserActivation } from "./useUserActivation";

export default pipe(useActivation, useUserActivation);
