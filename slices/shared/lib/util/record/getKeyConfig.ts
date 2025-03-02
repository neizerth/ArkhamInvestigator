type Config<T> = Record<string, T> & {
  default: T
}

export const getKeyConfig = <T>(config: Config<T>) => 
  (key?: string) => {
    if (key && key in config) {
      return {
        ...config.default,
        ...config[key],
      }
    }

    return config.default;
  }