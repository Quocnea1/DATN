import { TableRow } from '@mui/material';

import { IPlainObject } from '@/utils/types/common';

type BodyTableRowProps<TRowDataType> = {
  children?: React.ReactNode;
  key: string;
  row?: TRowDataType;
  onClick?: ({ event, row }: { event: React.MouseEvent<unknown>; row: TRowDataType | undefined }) => void;
};
const BodyTableRow = <TRowDataType extends IPlainObject>({
  children,
  key,
  row,
  onClick,
}: BodyTableRowProps<TRowDataType>) => {
  const handleRowClick = (event: React.MouseEvent<unknown>) => {
    onClick?.({
      event,
      row,
    });
  };

  return (
    <TableRow
      key={key}
      onClick={(event: React.MouseEvent<unknown>) => handleRowClick(event)}
    >
      {children}
    </TableRow>
  );
};

export default BodyTableRow;
