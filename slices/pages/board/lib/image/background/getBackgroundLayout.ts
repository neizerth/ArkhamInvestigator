import type { Box, BoxLayout, BoxPosition } from "@shared/model/ui";
import type { InvestigatorImage } from "arkham-investigator-data";
import type { HeaderLayout } from "@pages/board/model";
import { getScaledMedia } from "./getScaledMedia";
import type { InvestigatorPicture } from "@shared/model";
import { ascend, head, lt, prop, sortWith } from "ramda";
import { faceSize, MAX_PORTRAIT_FACE_SIZE } from "@pages/board/config";
import { getCoverScale, getCoverScaleAt, scaleBox, scaleBoxLayout, scaleBoxPosition } from "@shared/lib";
import { getBoxCenter, getBoxLayoutCenter } from "@shared/lib/util/size/box";

type GetImageLayout = {
  layout: HeaderLayout
  view: Box
  picture: InvestigatorPicture
}

export const getBackgroundLayout = ({
  picture,
  layout,
  view
}: GetImageLayout) => {
  
  const { image } = picture;
  const { face } = image;

  if (!face) {
    return null;
  }
  
  const vh = view.height / 100
  const faceScale = {
    min: faceSize.min * vh / face.height,
    max: faceSize.max * vh / face.height,
  }
  
  const imageCenter = getBoxCenter(image);
  const faceCenter = getBoxLayoutCenter(face);

  const offset = {
    top: faceCenter.top - imageCenter.top,
    left: faceCenter.left - imageCenter.left,
  }
 
  const faceImage =  {
    width: image.width + offset.left,
    height: image.height + offset.top
  }

  const imageView = {
    ...view,
    height: view.height - layout.height
  }

  const minScale = getCoverScaleAt({
    position: faceCenter,
    view: imageView,
    box: faceImage
  })

  const scale = Math.max(minScale, faceScale.min);

  const scaledImage = scaleBox(image, scale)

  const scaledImageCenter = getBoxCenter(scaledImage);

  const viewCenter = getBoxCenter(view);
  const scaledOffset = scaleBoxPosition(offset, scale);


  const center = {
    top: scaledImageCenter.top - viewCenter.top + scaledOffset.top + layout.height,
    left: scaledImageCenter.left - viewCenter.left + scaledOffset.left
  }

  console.log({
    center,
    scale,
    image,
    face,
    faceCenter,
    offset,
    scaledOffset
  })
  // const top = scaledImage.height < view.height ? scaledImage.height - view.height : center.top;

  return {
    width: scaledImage.width,
    height: scaledImage.height,
    left: center.left,
    top: center.top
    // top: scaledImage.height - view.height
    // top: center.top
  };
}