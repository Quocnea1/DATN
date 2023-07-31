import { CircularProgress } from '@mui/material';

import { Wrapper } from '@/components/molecules/Loader/Loader.styled';

const Loader = () => {
  return (
    <Wrapper>
      <CircularProgress />
    </Wrapper>
  );
};

export default Loader;
