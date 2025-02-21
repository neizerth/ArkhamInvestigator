import { type Href, router } from "expo-router";

export const navigateTo = (href: Href) => () => {
  router.push(href);
}