import type { ImageMedia } from "@pages/board/model";
import { coverBox, getMinScale, scaleBox, scaleBoxLayout, scaleBoxPosition, scaleBoxWidth } from "@shared/lib";
import { getOrientation } from "@shared/lib/util/size/common";
import type { Box } from "@shared/model";
import type { InvestigatorImage } from "arkham-investigator-data";
import { getAvailableScale } from "./getAvailableScale";

export const coverMediaBox = (options: {
  view: Box,
  media: ImageMedia
  image: InvestigatorImage
  container: Box
  paddingTop: number
}) => {
  const {
    view,
    // container = view,
    media,
    paddingTop,
    image
  } = options;

  const available = {
    width: image.width,
    height: image.height - paddingTop,
    scale: getMinScale({
      box: view,
      view: image
    })
  }

  const availableScale = getAvailableScale({
    view,
    box: media,
    available,
  });

  const minScale = paddingTop / media.top;

  const scale = media.top > paddingTop ? 
    Math.max(availableScale, minScale) : minScale;

  const scaledMedia = scaleBoxLayout(media, scale);
  const scaledImage = scaleBox(image, scale);
  const scaledView = scaleBox(view, scale);

  const dX = (scaledImage.width - scaledMedia.width) / 2;
  const dY = (scaledImage.height - scaledMedia.height) / 2;

  const left = Math.max(scaledView.width / 2 + scaledMedia.left - dX, 0);
  const top = Math.max(scaledView.height / 2 + scaledMedia.top - dY - paddingTop, paddingTop);
  
  // console.log({ 
  //   available, 
  //   scaledMedia, 
  //   scaledAvailable,
  //   left,
  //   top,
  //   paddingTop,
  //   dX, dY,
  //   scale 
  // });

  console.log(scaledImage)

  return {
    left,
    top,
    width: scaledMedia.width,
    height: scaledMedia.height,
    image: scaledImage,
    scale
  }
}

