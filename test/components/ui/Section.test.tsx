import * as React from "react";
import * as renderer from "react-test-renderer";
import Section from "~/components/ui/Section";

describe("<Section>", () => {
  it("should render correctly", () => {
    const tree = renderer.create(<Section>alo</Section>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
