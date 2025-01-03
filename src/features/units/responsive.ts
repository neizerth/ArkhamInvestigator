export const createResponsiveUnit = ({
  defaultValue,
  name
}: {
  defaultValue: number,
  name: string
}) => 
  (value: number) => {
    const cssVar = `var(--${name})`;
    return `calc(${cssVar} / ${defaultValue} * ${value})`
  }