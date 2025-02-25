import { scaleBox, scaleBoxHeight, scaleBoxWidth } from "@shared/lib"
import type { Box, ScaledBox } from "@shared/model"
import { ascend, head, pick, prop, sortWith } from "ramda"

type ScaleAvailableOptions = {
  view: Box
  box: Box
  available: Box
}
export const getAvailableScale = (options: ScaleAvailableOptions) => {
  const data = [
    getMinScale({
      ...options,
      box: scaleBoxWidth(options)
    }),
    getMinScale({
      ...options,
      box: scaleBoxHeight(options)
    })
  ];

  return Math.min(...data);
}

const getMinScale = (options: ScaleAvailableOptions & {
  box: ScaledBox
}) => {
  const {
    box,
    view,
    available
  } = options;

  const scaledAvailable = scaleBox(available, box.scale)

  if (box.width === view.width) {
    const diff = view.height - box.height;
    if (scaledAvailable.height > diff) {
      return box.scale;
    }

    return view.height / available.height
  }

  const diff = view.width - box.width;

  if (scaledAvailable.width > diff) {
    return box.scale;
  }

  return view.width / available.width;
}