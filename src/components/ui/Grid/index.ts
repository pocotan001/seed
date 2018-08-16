import Cell from "./Cell";
import _Grid from "./Grid";

const Grid: typeof _Grid & {
  Cell: typeof Cell;
} = _Grid as any;

Grid.Cell = Cell;

export default Grid;
