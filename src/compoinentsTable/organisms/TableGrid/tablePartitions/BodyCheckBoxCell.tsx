import { useCallback } from 'react';

import { styled, TableCell } from '@mui/material';
import CheckBox from '@mui/material/Checkbox';

import { IPlainObject } from '@/utils/types/common';

const StyledTableCell = styled(TableCell)(() => ({
  '&>div': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
type BodyCheckBoxCellProps<TRowDataType> = {
  checked: boolean;
  row: TRowDataType;
  onChange: ({ row, checked }: { row: TRowDataType; checked: boolean }) => void;
};

const BodyCheckBoxCell = <TRowDataType extends IPlainObject>({
  onChange,
  row,
  checked,
  ...props
}: BodyCheckBoxCellProps<TRowDataType>) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.({
        row,
        checked: e.target.checked,
      });
    },
    [onChange, row]
  );

  return (
    <StyledTableCell
      key={'table-body-contents-selection'}
      align="center"
    >
      <CheckBox
        checked={checked}
        onChange={handleChange}
        onClick={(e) => e.stopPropagation()}
        {...props}
      />
    </StyledTableCell>
  );
};

export default BodyCheckBoxCell;
