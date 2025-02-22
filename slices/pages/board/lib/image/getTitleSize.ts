import { titleSize } from "@pages/board/config";
import type { Box } from "@shared/model/ui";

const titleRatio = titleSize.width / titleSize.height;

export const getTitleSize = (window: Box) => {
  const scale = window.width / titleSize.width;
  const gap = titleSize.gap * scale;
  const imageWidth = Math.min(window.width + gap, titleSize.width);
  const imageHeight = imageWidth / titleRatio;

  const maxHeight = window.height * titleSize.maxHeightPercentage / 100;

  if (imageHeight < maxHeight) {
    return {
      width: imageWidth,
      height: imageHeight
    };
  }

  const height = maxHeight;
  const width = height * titleRatio;

  return {
    scale,
    width,
    height
  };
}