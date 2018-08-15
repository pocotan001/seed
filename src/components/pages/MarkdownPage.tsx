import * as React from "react";
import Page from "~/components/layouts/Page";
import Content from "~/components/ui/Content";

const MarkdownPage: React.SFC = () => (
  <Page>
    <Content
      dangerouslySetInnerHTML={{
        __html: preval`
          const fs = require("fs");
          const marked = require("marked");

          module.exports = marked(
            fs.readFileSync(require.resolve("../../assets/md/demo.md"), "utf8"),
            { headerIds: false, sanitize: true }
          );
        `
      }}
    />
  </Page>
);

export default MarkdownPage;
