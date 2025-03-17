import type { Point } from "@shared/model";
import type { SvgPatternImageProps } from "./SvgPatternImage.types";
import { props } from "ramda";

export const getPatternProps = ({
  width,
  height,
  patternWidth,
  patternHeight,
  ...props
}: SvgPatternImageProps) => {

  const resizeMode = props.resizeMode === 'stretch' && width < patternWidth ? 
    'repeat' : props.resizeMode;

  switch (resizeMode) {
    case 'stretch': {
      const scale = width / patternWidth;
      return {
        width,
        height,
        patternTransform: `scale(${scale})`,
        viewBox: `0 0 ${width} ${height}`
      }
    }
    case 'repeat': {
      const scale = height / patternHeight;
      return {
        width: patternWidth,
        height,
        patternTransform: `scale(1, ${scale})`,
        viewBox: `0 0 ${patternWidth} ${height}`
      }
    }
  }
}