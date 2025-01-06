export const getLines = (text: string) => {
  return text
    .split('\n')
    .map(mapLine);
}

const ICON_PATTERN = /(\[.+\])/g;

export const mapLine = (line: string) => {

  return line
    .split(ICON_PATTERN)
    .filter(x => Boolean(x))
    .map(mapFragment);
}

export const mapFragment = (fragment: string) => {
  
  const isIcon = ICON_PATTERN.test(fragment);

  if (!isIcon) {
    return {
      type: 'text',
      text: fragment
    }
  }

  const icon = fragment.replace(/\W+/g, '');

  return {
    type: 'icon',
    icon
  }
}