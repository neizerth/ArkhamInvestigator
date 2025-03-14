export const formatGameText = (text: string) => 
  text.replace(/"([^"]*)"/g, '“$1”');