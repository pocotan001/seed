import * as React from "react";
import config from "~/config";
import { State } from "~/store/state";

interface HeadProps {
  title: string;
  meta?: State["head"]["meta"];
  link?: State["head"]["link"];
  scripts?: string[];
}

if (config.isClient) {
  throw new Error("<Head> shouldn't be included in the client-side code");
}

const Head: React.SFC<HeadProps> = ({
  title,
  meta = [],
  link = [],
  scripts = []
}) => (
  <head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="format-detection" content="telephone=no" />

    {/* Chrome, Firefox OS and Opera */}
    <meta name="theme-color" content="#000000" />

    {/* Edge and IE 12 */}
    <meta name="msapplication-TileColor" content="#ffffff" />
    <meta name="msapplication-config" content="/browserconfig.xml" />

    {meta.map((props, i) => (
      <meta key={i} {...props} data-head />
    ))}

    <title>{title}</title>

    {scripts.map((src, i) => (
      <link key={i} rel="preload" href={src} as="script" />
    ))}

    {link.map((props, i) => (
      <link key={i} {...props} data-head />
    ))}

    <link
      href="https://fonts.googleapis.com/css?family=Lato:400,700"
      rel="stylesheet"
    />

    {/* iOS Safari */}
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

    {/* macOS Safari */}
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />

    {/* Android Chrome */}
    <link rel="manifest" href="/manifest.json" />

    {/* Desktop browsers */}
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="shortcut icon" href="/favicon.ico" />
  </head>
);

export default Head;
