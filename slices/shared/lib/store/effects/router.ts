import { type Href, router } from "expo-router";

export const goToPage = (href: Href) => () => {
  router.push(href);
  console.log('goto', href);
}

export const replacePageTo = (href: Href) => () => {
  router.replace(href);
}

export const goBack = () => () => {
  router.back();
}