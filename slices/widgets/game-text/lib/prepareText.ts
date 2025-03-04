const nbsp = '\xa0';
export const prepareText = (text: string) => {
  return `<content>${text}</content>`
    .replace(/(\d+) /g, `$1${nbsp}`)
    .replace(/ (\d+)/g, `${nbsp}$1`)
    .replace(/\] /g, `]${nbsp}`)
    // markdown bold
    .replace(/\[\[([^\]]+)\]\]/g, '<keyword>$1</keyword>')
    // icons
    .replace(/\[([^\]]+)\]/g, '<icon icon="$1" />')
}
