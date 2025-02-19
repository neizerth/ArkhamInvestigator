import { isNotEmpty } from "ramda";
import { v4 } from 'uuid'

export const parseText = (text: string) => {
  return text
    .split(ICON_PATTERN)
    .filter(isNotEmpty)
    .map(mapFragment);
}

const ICON_PATTERN = /(\[.+\])/g;

export const mapFragment = (fragment: string) => {
  
  const isIcon = ICON_PATTERN.test(fragment);

  if (!isIcon) {
    return {
      id: v4(),
      type: 'text',
      value: fragment
    }
  }

  const value = fragment.replace(/\W+/g, '');

  return {
    id: v4(),
    type: 'icon',
    value
  }
}