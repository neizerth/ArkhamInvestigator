import type { Box } from "@shared/model";
import * as C from "@pages/board/config";
import type { HeaderLayout, HeaderLayoutType } from "@pages/board/model";

const headerRowWidth = C.titleStyle.width + C.skillsStyle.width - C.HEADER_GAP;

export const getHeaderLayoutType = ({ width }: Box): HeaderLayoutType => 
  width > C.MAX_COLUMN_WIDTH ? 'row' : 'column';

export const resizeHeaderLayout = (window: Box) => 
  (layout: HeaderLayout): HeaderLayout => {
    const maxHeight = window.height * C.MAX_IMAGE_HEIGHT / 100;

    if (layout.type === 'row' || layout.height <= maxHeight) {
      return layout;
    }

    const height = maxHeight;
    const scale = maxHeight / C.HEADER_HEIGHT;
    const width = layout.width * scale;
    const gap = C.HEADER_GAP * scale;

    return {
      type: 'row',
      width,
      height,
      scale,
      gap
    }
  }


export const getHeaderLayout = (window: Box): HeaderLayout => {
  const type = getHeaderLayoutType(window);
  const resize = resizeHeaderLayout(window);

  if (type === 'column') {
    const { width } = window;
    const scale = width / headerRowWidth;
    const height = C.HEADER_HEIGHT * scale;
    const gap = C.HEADER_GAP * scale;

    return resize({
      type: 'column',
      width,
      height,
      scale,
      gap
    })
  }
  
  const width = Math.min(
    window.width,
    headerRowWidth
  )

  const scale = width / headerRowWidth;
  const height = C.HEADER_HEIGHT * scale;
  const gap = C.HEADER_GAP * scale;

  return resize({
    type: 'row',
    width,
    height,
    scale,
    gap
  })
}