import type { Box, BoxLayout, BoxPosition, BoxRect, ScaledBox } from "@shared/model";
import { getBoxCenter, getRect, translateBoxLayout } from "./box";
import { ascend, descend, identity } from "ramda";

export const scaleBox = (box: Box, scale: number): Box => ({
  width: box.width * scale,
  height: box.height * scale,
})

export const scaleBoxPosition = (box: BoxPosition, scale: number): BoxPosition => ({
  left: box.left * scale,
  top: box.top * scale,
})

export const scaleBoxLayout = (box: BoxLayout, scale: number): BoxLayout => ({
  ...scaleBox(box, scale),
  ...scaleBoxPosition(box, scale)
})

export const scaleBoxWidth = (options: {
  view: Box,
  box: Box
}): ScaledBox => {
  const { view, box } = options;
  const { width } = view;
  const scale = view.width / box.width;
  const height = box.height * scale;

  return {
    width,
    height,
    scale
  }
}

export const scaleBoxHeight = (options: {
  view: Box,
  box: Box
}): ScaledBox => {
  const { view, box } = options;
  const { height } = view;
  const scale = view.height / box.height;
  const width = box.height * scale;

  return {
    width,
    height,
    scale
  }
}

export const getCoverScale = (options: {
  view: Box,
  box: Box
}): number => {
  const {
    view,
    box,
  } = options;

  let scale = view.width / box.width;

  if (box.height * scale < view.height) {
    scale = view.height / box.height;
  }

  return scale
}

export const getContainScale = (options: {
  view: Box,
  box: Box
}): number => {
  const {
    view,
    box,
  } = options;

  let scale = view.width / box.width;

  if (box.height * scale > view.height) {
    scale = view.height / box.height;
  }

  return scale
}

export const getMinScale = (options: {
  box: Box,
  view: Box
}) => {
  const { box, view } = options
  const widthScale = box.width / view.width;
  const heightScale = box.height / view.height;

  return Math.max(widthScale, heightScale)
}

export const getCoverScaleAt = (options: {
  box: Box,
  view: Box,
  position: BoxPosition
}) => {
  const { position, view } = options;
  const coverScale = getContainScale(options);
  const containScale = getContainScale(options);
  const box = scaleBox(options.box, containScale);

  const rect = getRect({
    view,
    box
  });

  const boxCenter = getBoxCenter(box);
  const dY = boxCenter.top - position.top;
  const dX = boxCenter.left - position.left;

  const diff = {
    top: -dY,
    bottom: dY,
    left: -dX,
    right: dX,
  }

  const layout = translateBoxLayout({
    box: rect,
    position: diff
  })

  const viewCenter = getBoxCenter(view);

  const scales = [
      viewCenter.top / (viewCenter.top - Math.min(layout.top, layout.bottom)),
      viewCenter.left / (viewCenter.top - Math.min(layout.left, layout.right)),
    ]
    .filter(scale => scale > 0)
    .sort(descend(identity))

  return scales[0] || Number.NEGATIVE_INFINITY;
}