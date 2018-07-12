import * as React from "react";
import * as renderer from "react-test-renderer";
import { Grid, GridCell } from "~/components/ui/Grid";

describe("<Grid>", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Grid>
          <GridCell>A</GridCell>
          <GridCell>B</GridCell>
        </Grid>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
