export const prepareText = (text: string) => {
  return `<content>${text}</content>`
    // markdown bold
    .replace(/\[\[(.+)\]\]/g, '<keyword>$1</keyword>')
    // icons
    .replace(/\[(.+)\]/g, '<icon icon="$1" />')
}
