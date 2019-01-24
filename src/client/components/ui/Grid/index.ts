import Cell from "./Cell";
import _Grid from "./Grid";

type Grid = typeof _Grid & {
  Cell: typeof Cell;
};

const Grid: Grid = _Grid as Grid;

Grid.Cell = Cell;

export default Grid;
