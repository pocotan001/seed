import * as React from "react";
import config from "~/config";
import { JsonLd as IJsonLd } from "~/domain/Document";

interface JsonLdProps {
  data?: IJsonLd[];
}

if (config.isClient) {
  throw new Error("<JsonLd> shouldn't be included in the client-side code");
}

// tslint:disable:no-http-string
const baseData: ReadonlyArray<IJsonLd> = [
  // Logos
  // https://developers.google.com/search/docs/data-types/logo
  {
    "@context": "http://schema.org",
    "@type": "Organization",
    url: config.origin,
    logo: `${config.origin}/logo-512x512.png`
  },
  // Social Profile
  // https://developers.google.com/search/docs/data-types/social-profile
  {
    "@context": "http://schema.org",
    "@type": "Person",
    name: config.siteName,
    url: config.origin,
    sameAs: [
      `https://twitter.com/${config.twitterId}`,
      `https://www.facebook.com/${config.facebookId}`
    ]
  }
];
// tslint:enable:no-http-string

const JsonLd: React.SFC<JsonLdProps> = ({ data = [] }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify([...baseData, ...data])
    }}
  />
);

export default JsonLd;
