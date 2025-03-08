import { type Href, router } from "expo-router";

export const navigateTo = (href: Href) => () => {
  router.push(href);
}

export const replaceTo = (href: Href) => () => {
  router.replace(href);
}

export const goBack = () => () => {
  router.back();
}