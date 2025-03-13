const nbsp = '\xa0';
export const prepareText = (text: string) => {
  const content = text
    .replace(/(\d+) /g, `$1${nbsp}`)
    .replace(/ (\d+)/g, `${nbsp}$1`)
    .replace(/\] /g, `]${nbsp}`)
    // markdown bold
    .replace(/\[\[([^\]]+)\]\]/g, '<keyword>$1</keyword>')
    // icons
    .replace(/\[([^\]]+)\]/g, '<icon icon="$1" />')
  
  const lines = content.split('\n')
  const paragraphs = lines.length > 0 ? 
    `<p>${lines.join('\n</p><p>')}</p>` : 
    content;

  return `<content>${paragraphs}</content>`
}
