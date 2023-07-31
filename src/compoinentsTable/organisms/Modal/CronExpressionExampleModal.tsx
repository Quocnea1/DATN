import { Button, DialogActions, Stack } from '@mui/material';

import { CmTextField } from '@/components/atoms/DataInput';
import CmModal from '@/components/organisms/Modal/CmModal';

import { cronExpressionExamples } from '@/utils/constants/form';

const CronExpressionExampleModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <CmModal
      title="Cron Expression Example"
      width="xs"
      isOpen
      onClose={onClose}
    >
      <Stack
        spacing={2}
        paddingTop={3}
        paddingLeft={3}
      >
        {cronExpressionExamples.map((item, index) => (
          <CmTextField
            key={index}
            label={item.label}
            renderAsText={item.value}
          />
        ))}
      </Stack>
      <DialogActions sx={{ paddingTop: 3 }}>
        <Button onClick={onClose}>OK</Button>
      </DialogActions>
    </CmModal>
  );
};
export default CronExpressionExampleModal;
