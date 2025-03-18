import { nbsp, wordJoiner } from "@shared/config";

export const prepareText = (text: string) => {
  const content = text
    // typography
    .replace(/(\d+) /g, `$1${nbsp}`)
    .replace(/ (\d+)/g, `${nbsp}$1`)
    // quotes
    .replace(/"([^"]+)"/g, '“$1”')
    // markdown bold
    .replace(/\[\[([^\]]+)\]\]/g, '<keyword>$1</keyword>')
    // icons
    .replace(/\[([^\]\[]+)\]/g, '<icon icon="$1"/>')
    .replace(/\/>(\S)/g, `"/>${wordJoiner}$1`)
    .replace(/\/>(\s)/g, `"/>${nbsp}$1`)
  
  const lines = content.split('\n')
  const paragraphs = lines.length > 0 ? 
    `<p>${lines.join('\n</p><p>')}</p>` : 
    content;

  return `<content>${paragraphs}</content>`
}
