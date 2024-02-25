import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { Product } from "../../types/types";

interface ProductsTableProps {
  productsList: Product[];
  openModalHandler: () => void;
  setSelectedRow: React.Dispatch<React.SetStateAction<Product | undefined>>;
}
const ProductsTable = ({
  productsList,
  setSelectedRow,
  openModalHandler,
}: ProductsTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Year</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productsList.map((row) => (
            <TableRow
              key={row.id}
              sx={{
                bgcolor: row.color,
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
              }}
              onClick={() => {
                setSelectedRow(row);
                openModalHandler();
              }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.year}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductsTable;
