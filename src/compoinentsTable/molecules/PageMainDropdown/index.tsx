import { ReactNode } from 'react';

import { CmDropdown } from '@/components/atoms/DataInput';

import { DropdownType } from '@/utils/types/common';

type CmPageMainDropdownProps = {
  optionsData?: DropdownType[];
  value?: string;
  onChange?: (event: any, child: ReactNode) => void;
  label?: string;
  onChangeValueDropdown?: (e: string) => void;
  verticalRender?: boolean;
  disable?: boolean;
};

function CmPageMainDropdown({
  optionsData = [],
  value,
  disable = false,
  onChange,
  verticalRender = false,
  label = 'Select Application',
}: CmPageMainDropdownProps) {
  return (
    <CmDropdown
      type="noneLabel"
      data={optionsData}
      onChange={onChange}
      value={value}
      label={label}
      labelPosition={!verticalRender ? 'top' : 'inline'}
      width="100%"
      disabled={disable}
    />
  );
}
export { CmPageMainDropdown };
