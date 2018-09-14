import * as React from "react";
import styled from "styled-components";
import { Color } from "~/components/styles/theme";
import { Link } from "~/components/ui";
import { Breadcrumb as IBreadcrumb } from "~/domain/Document";

interface BreadcrumbProps {
  data: IBreadcrumb[];
  className?: string;
}

const baseData: ReadonlyArray<IBreadcrumb> = [
  {
    title: "Home",
    path: "/"
  }
];

const Breadcrumb: React.SFC<BreadcrumbProps> = ({ data, className }) => {
  data = [...baseData, ...data];
  const lastIndex = data.length - 1;

  return (
    <nav className={className} aria-label="breadcrumb">
      <ol>
        {data.map(
          ({ title, path }, i) =>
            i === lastIndex ? (
              <li key={title} aria-current="page">
                {title}
              </li>
            ) : (
              <li key={title}>
                <Link href={path} asText>
                  {title}
                </Link>
              </li>
            )
        )}
      </ol>
    </nav>
  );
};

export default styled(Breadcrumb)`
  font-size: 0.875rem;
  color: ${Color.Grey800};

  > ol > li {
    display: inline-block;
    margin-right: 0.5em;

    + li::before {
      display: inline-block;
      color: ${Color.Grey500};
      content: ">";
      margin-right: 0.5em;
    }
  }
`;
