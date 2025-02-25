import { scaleBox, scaleBoxHeight, scaleBoxLayout, scaleBoxWidth, scaleCoverBox } from "@shared/lib"
import type { Box, BoxLayout, PropsWithScaledBox, ScaledBox } from "@shared/model"
import { ascend, head, pick, prop, sortWith } from "ramda"

type ScaleAvailableOptions = {
  view: Box
  box: BoxLayout
  available: ScaledBox
}
export const getAvailableScale = (options: ScaleAvailableOptions) => {
  const { scale } = scaleCoverBox(options);
  const data = [
    getMinWidthScale(options),
    getMinHeightScale(options)
  ];

  return Math.max(
    Math.min(...data),
    scale
  );
}

type GetMinScaleOptions = ScaleAvailableOptions;

const getMinWidthScale = (options: GetMinScaleOptions) => {
  const {
    view,
    available
  } = options;

  const scale = Math.max(
    available.scale,
    view.height / options.box.height
  );

  const box = scaleBoxLayout(options.box, scale);
  const scaledAvailable = scaleBox(available, scale);

  const diff = view.height - box.height;

  if (scaledAvailable.height > diff) {
    return scale;
  }

  return view.height / available.height
}

const getMinHeightScale = (options: GetMinScaleOptions) => {
  const {
    view,
    available
  } = options;

  const scale = Math.max(
    available.scale,
    view.width / options.box.width
  );

  const box = scaleBoxLayout(options.box, scale);
  
  const scaledAvailable = scaleBox(available, scale)

  const diff = view.width - box.width;

  const k = scaledAvailable.height > view.height ? 
    scaledAvailable.height / (view.height - box.left) : 1;

  // return Infinity;
  if (scaledAvailable.width > diff) {
    return scale;
  }

  return view.width / available.width
}