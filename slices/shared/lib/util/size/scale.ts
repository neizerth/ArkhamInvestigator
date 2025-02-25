import type { Box, BoxLayout, BoxPosition, ScaledBox } from "@shared/model";

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
  const scale = view.width / box.width;

  return {
    ...scaleBox(box, scale),
    scale
  }
}

export const scaleBoxHeight = (options: {
  view: Box,
  box: Box
}): ScaledBox => {
  const { view, box } = options;
  const scale = view.height / box.height;

  return {
    ...scaleBox(box, scale),
    scale
  }
}

export const coverBox = (options: {
  view: Box,
  box: Box
}): ScaledBox => {
  const {
    view,
    box,
  } = options;

  let scale = view.width / box.width;

  if (box.height * scale < view.height) {
    scale = view.height / box.height;
  }

  const scaledBox = scaleBox(box, scale)

  return {
    ...scaledBox,
    scale
  }
}

export const getMinScale = (options:{
  box: Box,
  view: Box
}) => {
  const { box, view } = options
  const widthScale = box.width / view.width;
  const heightScale = box.height / view.height;

  return Math.max(widthScale, heightScale)
}