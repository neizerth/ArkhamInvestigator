import type { ArkhamIcon } from "@shared/model";
import type { IconScaleType } from "./Icon";

export const getIconScale = (
  icon: ArkhamIcon, 
  scaleType: IconScaleType = 'maxHeight'
) => {
  if (!icon.ratio) {
    return 1;
  }
  const { ratio } = icon;

  switch (scaleType) {
    case 'maxHeight':
      return ratio > 1 ? 1 / ratio : 1;
    case 'fixedHeight':
      return ratio > 1 ? 1 / ratio : ratio;
    case 'auto':
      return icon.ratio;
    default:
      return 1;
  }
}