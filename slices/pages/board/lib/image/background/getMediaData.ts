import type { ImageMedia } from "@pages/board/model";
import type { InvestigatorPicture } from "@shared/model";
import type { InvestigatorImageMedia } from "arkham-investigator-data";
import { fromPairs, groupBy, isNotNil, prop, propEq, values } from "ramda";
import { v4 } from "uuid";

export const getMediaData = (picture: InvestigatorPicture) => {
  const { id, image } = picture;
  const sources = getMediaSources(picture);

  const pairs = groupBy(
    prop('sourceId'),
    sources
  )

  const groups = Object.entries(pairs)
    .map(([groupId, value]) => {
      if (!value) {
        return null;
      }
      
      const [first] = value;
      const source = first.source || {
        id,
        type: 'full',
        width: image.width,
        height: image.height
      };

      const media = value.map(media => ({
        ...media,
        groupId
      }))

      return {
        id: groupId,
        source,
        media
      }
    })
    .filter(isNotNil);

  const media = groups.flatMap(
    prop('media')
  );

  return {
    groups,
    media
  };
}

export const getMediaSources = ({ id, image }: InvestigatorPicture): ImageMedia[] => {
  const data = image.media
    .map(media => ({
      ...media,
      sourceId: getSourceId(media, id),
      next: null
    }))
    .map((media, _, data) => {
      const sources = data.filter(
        propEq(media.sourceId, 'sourceId')
      );

      const primary = media.primary || 
        sources.length === 1 || sources[0] === media;

      return {
        ...media,
        primary
      }
    });

  return data
    .filter(propEq(true, 'primary'))
    .map(media => {
      const enlargeTo = data.find(
        ({ primary, sourceId }) => sourceId === media.sourceId && !primary
      )

      if (!enlargeTo) {
        return media;
      }
      
      return ({
        ...media,
        enlargeTo
      })
    });
}

export const getSourceId = (
  media: InvestigatorImageMedia, 
  defaultId: string
) => {
  return media.source?.id || defaultId;
}