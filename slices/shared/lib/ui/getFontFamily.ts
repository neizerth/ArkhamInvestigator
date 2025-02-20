import { FontFaceType } from "@shared/model/ui";
import { capitalize } from "../util";
import { curry, curryN } from "ramda";


export const getFontFamily = curryN(
  2,
  <T extends keyof FontFamily>(
    fontFamily: T, 
    fontFace: FontFaceType = 'regular'
  ) => `${fontFamily}${capitalize(fontFace)})`
);