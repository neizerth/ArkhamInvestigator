import type { Box, BoxLayout, BoxPosition, BoxRect, Orientation, RectPosition } from "@shared/model";

export const getOrientation = ({ 
  width, 
  height 
}: Box): Orientation => width > height ? 'landscape' : 'portrait';

export const getBoxLayoutCenter = ({
  width,
  height,
  left,
  top
}: BoxLayout) => ({
  left: left + width / 2,
  top: top + height / 2,
})

export const getBoxCenter = ({
  width,
  height
}: Box) => ({
  left: width / 2,
  top: height / 2,
})

export const getRect = (options: {
  view: Box
  box: Box
}): BoxRect => {
  const { view, box } = options;
  const boxCenter = getBoxCenter(box);
  const viewCenter = getBoxCenter(view);

  const left = viewCenter.left - boxCenter.left;
  const top = viewCenter.top - boxCenter.top;

  return {
    ...box,
    left,
    top,
    right: left,
    bottom: top,
  }
}

export const translateBoxLayout = ({
  box,
  position
}: {
  position: Partial<RectPosition>
  box: BoxRect
}): BoxRect => {
  const {
    left = 0,
    top = 0,
    right = 0,
    bottom = 0
  } = position;
  return {
    ...box,
    left: box.left + left,
    top: box.top + top,
    right: box.right + right,
    bottom: box.bottom + bottom,
  }
}