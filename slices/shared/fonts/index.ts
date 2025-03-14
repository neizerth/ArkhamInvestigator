import common from "./common";
import ko from "./ko";
import ru from "./ru";
import zh from "./zh";

export * from './common'
export * from './ko'
export * from './ru'
export * from './zh'

export default {
  ...common,
  // Russian
  ...ru,
  // Korean
  ...ko,
  // Chinese
  ...zh
}