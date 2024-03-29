import { FC, PropsWithChildren } from "react";
import "the-new-css-reset/css/reset.css";
import "~/app/_/styles/globals.css";

export const metadata = {
  title: "Web",
  description: "Generated by create next app",
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="ja">
    <body>{children}</body>
  </html>
);

export default RootLayout;
