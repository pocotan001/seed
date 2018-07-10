import * as React from "react";
import config from "~/config";
import { State } from "~/store/state";

interface IScriptsProps {
  state: State;
  srcs: string[];
  nonce: string;
}

if (config.isClient) {
  throw new Error("<Scripts> shouldn't be included in the client-side code");
}

const Scripts: React.SFC<IScriptsProps> = ({ state, srcs, nonce }) => (
  <>
    <script
      nonce={nonce}
      dangerouslySetInnerHTML={{
        __html: `window.__STATE=${JSON.stringify(state)}`
      }}
    />
    {srcs.map((src, i) => <script key={i} nonce={nonce} src={src} />)}
  </>
);

export default Scripts;
