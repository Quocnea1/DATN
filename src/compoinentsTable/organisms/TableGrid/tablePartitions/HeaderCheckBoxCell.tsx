import * as React from 'react';
import { ChangeEvent } from 'react';

import { styled } from '@mui/material';
import CheckBox from '@mui/material/Checkbox';

const StyledTableCell = styled('th')(() => ({
  width: '40px',
}));

const StyledCheckBoxWrapper = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

interface IHeaderCheckBoxCellProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  rowsCount: number;
  selectedRowsCount: number;
  disabled?: boolean;
}

const HeaderCheckBoxCell = ({ rowsCount, selectedRowsCount, onChange, ...props }: IHeaderCheckBoxCellProps) => {
  return (
    <StyledTableCell>
      <StyledCheckBoxWrapper>
        <CheckBox
          // color="info"
          checked={!!rowsCount && rowsCount === selectedRowsCount}
          onChange={onChange}
          indeterminate={!!selectedRowsCount && rowsCount !== selectedRowsCount}
          {...props}
        />
      </StyledCheckBoxWrapper>
    </StyledTableCell>
  );
};

export default React.memo(HeaderCheckBoxCell);
