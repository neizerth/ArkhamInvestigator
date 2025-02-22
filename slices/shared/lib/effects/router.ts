import { type Href, router } from "expo-router";

export const redirectTo = (href: Href) => () => {
  router.push(href);
}

export const replaceTo = (href: Href) => () => {
  router.replace(href);
}