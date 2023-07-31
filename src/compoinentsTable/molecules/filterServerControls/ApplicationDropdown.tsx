import { useEffect, useMemo } from 'react';

import { SelectChangeEvent } from '@mui/material';

import { CmDropdown } from '@/components/atoms/DataInput';

import { useGetResourceStatus } from '@/apis/hooks/resource.hook';
import { DropdownType } from '@/utils/types/common';

type ApplicationDropdownProps = {
  nodeId: string;
  appId: string;
  onChange: (value: DropdownType | undefined) => void;
  label: string;
  labelPosition?: 'inline' | 'top';
};

const ApplicationDropdown = ({ nodeId, appId, onChange, label, labelPosition = 'top' }: ApplicationDropdownProps) => {
  const { data: appList } = useGetResourceStatus({
    requestParams: { resource_type: 'APPLICATION', node_id: nodeId },
    enable: !!nodeId,
    onSuccess: (apps) => {
      const firstApp = apps?.[0];
      onChange(firstApp ? { label: firstApp.physical_name, value: firstApp.resource_id } : undefined);
    },
  });

  const appListDropdown: DropdownType[] = useMemo(() => {
    const convertedApps: DropdownType[] = appList?.length
      ? appList.map((resource) => {
          return {
            label: resource.physical_name,
            value: resource.resource_id,
          };
        })
      : [];
    return convertedApps;
  }, [appList]);

  const onSelectApp = (e: SelectChangeEvent<unknown>) => {
    const appId = e.target.value || '';
    const app = appListDropdown.find((app) => app.value === appId);
    onChange(app);
  };

  useEffect(() => {
    onChange(undefined);
  }, [nodeId]);

  return (
    <CmDropdown
      label={label}
      data={appListDropdown}
      onChange={onSelectApp}
      value={appId}
      labelPosition={labelPosition}
      width="300px"
      labelStyle={{ marginBottom: 1 }}
    />
  );
};

export default ApplicationDropdown;
