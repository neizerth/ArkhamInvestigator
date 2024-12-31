
export const propIn = <T, K extends keyof T>(prop: K, values: T[K][]) => (item: T) => 
  values.includes(item[prop])

export const safeMap = <T, K extends keyof T>(item: T, map: (value: T[K]) => T[K]) => 
  (prop: K) => item[prop] && map(item[prop]);