import { HEADER_HEIGHT, headerGap, titleStyle } from "@pages/board/config";
import type { HeaderLayout } from "@pages/board/model";

const titleRatio = titleStyle.width / HEADER_HEIGHT;

export const getTitleSize = (layout: HeaderLayout) => {
  if (layout.type === 'column') {
    const scale = layout.width / titleStyle.width;
    const gap = headerGap.horizontal * scale;
    const width = layout.width + gap;
    const height = width / titleRatio;

    return {
      width,
      height,
      scale
    }
  }
  const { scale } = layout;
  const width = titleStyle.width * scale;
  const height = HEADER_HEIGHT * scale;

  return {
    width,
    height,
    scale
  }
}

// export const getTitleSize = (window: Box) => {
//   const scale = window.width / titleStyle.width;
//   const gap = titleStyle.gap * scale;
//   const imageWidth = Math.min(window.width + gap, titleStyle.width);
//   const imageHeight = imageWidth / titleRatio;

//   const maxHeight = window.height * titleStyle.maxHeight / 100;

//   if (imageHeight < maxHeight) {
//     return {
//       width: imageWidth,
//       height: imageHeight,
//       scale
//     };
//   }

//   const height = maxHeight;
//   const width = height * titleRatio;

//   return {
//     scale: maxHeight / titleStyle.height,
//     width,
//     height
//   };
// }