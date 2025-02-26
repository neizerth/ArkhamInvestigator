import type { HeaderLayout } from "@pages/board/model"
import { scaleBox, scaleBoxPosition } from "@shared/lib"
import type { Box, InvestigatorPicture } from "@shared/model"
import { getMediaData } from "./getMediaData"
import { coverMediaBox } from "./coverMediaBox"

export type GetBackgroundMediaOptions = {
  layout: HeaderLayout
  box: Box
  picture: InvestigatorPicture
}

export const getScaledMedia = ({
  box,
  picture,
  layout
}: GetBackgroundMediaOptions) => {
  const { image } = picture;

  const { media } = getMediaData(picture);

  return media.map(
    media => coverMediaBox({
      container: image,
      view: box,
      media,
      image,
      layout
    })
  );
}