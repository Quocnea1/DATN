import { Stack, TableCell, Typography } from '@mui/material';

type TableEmptyProps = {
  numOfColumns?: number;
};

const TableEmpty = ({ numOfColumns }: TableEmptyProps) => {
  return (
    <tr>
      <TableCell
        colSpan={numOfColumns}
        sx={{ borderBottom: 0 }}
      >
        <Stack
          direction="column"
          margin={3}
          justifyContent="center"
          alignItems="center"
        >
          <Typography fontSize="14px">No resources were created.</Typography>
          <Typography fontSize="14px">Try creating a new resource.</Typography>
        </Stack>
      </TableCell>
    </tr>
  );
};

export default TableEmpty;
