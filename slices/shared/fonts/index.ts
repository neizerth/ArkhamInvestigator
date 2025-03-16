import common from "./common";
import ko from "./ko";
import ru from "./ru";
import vi from "./vi";
import zh from "./zh";

export * from './common'
export * from './ko'
export * from './ru'
export * from './zh'
export * from './vi'

export default {
  ...common,
  // Russian
  ...ru,
  // Korean
  ...ko,
  // Chinese
  ...zh,
  // Vietnamese
  ...vi
};