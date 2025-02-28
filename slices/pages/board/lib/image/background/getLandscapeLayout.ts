import type { Box } from "@shared/model/ui";
import type { HeaderLayout } from "@pages/board/model";
import { miniImageSize } from "@shared/config";
import { servicePadding } from "@pages/board/config";

type GetImageLayout = {
  layout: HeaderLayout
  view: Box
}

export const getLandscapeLayout = ({
  layout,
  view
}: GetImageLayout) => {
  const ratio = miniImageSize.width / miniImageSize.height;
  const height = view.height - layout.height - servicePadding.row.top - layout.gap * 2;
  const width = height * ratio;

  return {
    width,
    height
  };
}