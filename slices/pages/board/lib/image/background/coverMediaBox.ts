import type { HeaderLayout, ImageMedia } from "@pages/board/model";
import { coverBox, getMinScale, scaleBox, scaleBoxLayout, scaleBoxPosition, scaleBoxWidth } from "@shared/lib";
import { getOrientation } from "@shared/lib/util/size/box";
import type { Box } from "@shared/model";
import type { InvestigatorImage } from "arkham-investigator-data";
import { getAvailableScale } from "./getAvailableScale";
import { HEADER_HEIGHT } from "@pages/board/config";

export const coverMediaBox = (options: {
  view: Box,
  media: ImageMedia
  image: InvestigatorImage
  container: Box
  layout: HeaderLayout
}) => {
  const {
    view,
    // container = view,
    media,
    layout,
    image
  } = options;

  const paddingTop = layout.height;

  const available = {
    width: image.width,
    // height: image.height,
    height: image.height - paddingTop,
    scale: getMinScale({
      box: view,
      view: image
    })
  }

  const defaultScale = getAvailableScale({
    view,
    box: media,
    available,
  });

  const scale = Math.max(defaultScale, available.scale)

  // const minScale = paddingTop / media.top;

  // const scale = media.top > paddingTop ? 
  //   Math.max(availableScale, minScale) : minScale;

  const scaledMedia = scaleBoxLayout(media, scale);
  const scaledImage = scaleBox(image, scale);
  const scaledView = scaleBox(view, scale);

  const dX = 0;
  const dY = (scaledView.height - scaledMedia.height) / 2;

  const left = Math.max(
    scaledMedia.left - dX, 
    0
  );
  // const top = Math.max(scaledMedia.top - dY - paddingTop, paddingTop);
  const layoutPadding = layout.type === 'row' ? 0 : layout.height - HEADER_HEIGHT * layout.scale / 2;
  const top = -layoutPadding + scaledMedia.top;

  console.log({
    scaledView,
    scaledImage
  })
  
  // console.log({ 
  //   media,
  //   scaledMedia, 
  //   scaledImage,
  //   left,
  //   top,
  //   paddingTop,
  //   dX, dY,
  //   scale 
  // });

  // console.log(scaledImage)

  return {
    left,
    top,
    width: scaledMedia.width,
    height: scaledMedia.height,
    image: scaledImage,
    scale
  }
}

