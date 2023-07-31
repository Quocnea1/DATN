import { IconButton, styled, TableCell } from '@mui/material';

const TableBodyCellWrapper = styled('div')<{ paddingLeft?: string }>(({ paddingLeft }) => ({
  width: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  flexDirection: 'row',
  alignItems: 'center',
  paddingLeft: paddingLeft,
  display: 'block',
  whiteSpace: 'nowrap',
}));

const HeaderLabel = styled('span')({
  alignItems: 'center',
  display: 'flex',
  width: '100%',
  gap: '4px',
});

const HeaderCellStyled = styled(TableCell)(({ theme }) => ({
  position: 'relative',
  '&>div:first-of-type': {
    width: '100%',
    display: 'flex',
  },
  '&>div:last-of-type ': {
    position: 'absolute',
    top: 0,
    right: '2px',
    height: '100%',
    width: '3px !important',
    cursor: 'col-resize',
    borderRadius: '1px',
    '&:hover': { backgroundColor: theme.palette.blue['500'] },
  },
}));

const StyledIconButton = styled(IconButton)<{ opacity?: number }>(({ opacity }) => ({
  width: '10px',
  height: '10px',
  margin: '0px 10px 0px 5px',
  textAlign: 'center',
  color: 'black',
  opacity: opacity,
}));

export { HeaderCellStyled, HeaderLabel, StyledIconButton, TableBodyCellWrapper };
