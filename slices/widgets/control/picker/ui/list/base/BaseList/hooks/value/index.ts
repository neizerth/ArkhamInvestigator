import { pipe } from "ramda";
import { useValueChange } from "./useValueChange";
import { useValueChanging } from "./useValueChanging";
import { useValueSet } from "./useValueSet";

export default pipe(useValueSet, useValueChange, useValueChanging);
