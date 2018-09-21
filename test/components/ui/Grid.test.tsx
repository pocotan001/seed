import * as React from "react";
import * as renderer from "react-test-renderer";
import Grid from "~/components/ui/Grid";

describe("<Grid>", () => {
  it("should render correctly", () => {
    const tree = renderer
      .create(
        <Grid>
          <Grid.Cell>A</Grid.Cell>
          <Grid.Cell>B</Grid.Cell>
        </Grid>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
