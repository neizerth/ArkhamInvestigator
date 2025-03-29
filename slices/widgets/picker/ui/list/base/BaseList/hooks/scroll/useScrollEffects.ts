import { pipe } from "ramda";
import { useScrollEdges } from "./useScrollEdges";
import { useScrollEnd } from "./useScrollEnd";

export const useScrollEffects = pipe(useScrollEnd, useScrollEdges);
