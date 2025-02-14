export const propIncludes = <T, K extends keyof T>(prop: K, values: T[K][]) => 
  (data: T) => values.includes(data[prop]);