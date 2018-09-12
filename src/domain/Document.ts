import config from "~/config";

export enum ElementId {
  App = "app",
  Modal = "modal"
}

export const createTitle = (chunk?: string): string =>
  chunk ? `${chunk} - ${config.siteName}` : config.siteName;

export const createBasicMetadata = ({
  title,
  description,
  path
}: {
  title: string;
  description: string;
  path: string;
}): Array<React.MetaHTMLAttributes<HTMLMetaElement>> => [
  { name: "description", content: description },
  { property: "og:url", content: `${config.origin}${path}` },
  { property: "og:title", content: title },
  { property: "og:description", content: description },
  { property: "og:site_name", content: config.siteName },
  { property: "og:image", content: `${config.origin}/og-image.png` },
  { property: "og:image:width", content: "1200" },
  { property: "og:image:height", content: "628" },
  { property: "og:type", content: "website" },
  { name: "twitter:card", content: "summary" },
  { name: "twitter:site", content: "@pocotan001" },
  { name: "twitter:title", content: title },
  { name: "twitter:description", content: description },
  { name: "twitter:image", content: `${config.origin}/og-image.png` }
];
