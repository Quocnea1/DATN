import { useEffect, useMemo } from 'react';

import { SelectChangeEvent } from '@mui/material';

import { CmDropdown } from '@/components/atoms/DataInput';

import { useGetResourceStatus } from '@/apis/hooks/resource.hook';
import { DropdownType } from '@/utils/types/common';

type ServiceGroupDropdownProps = {
  nodeId: string;
  appId: string;
  serviceGroupId: string;
  onChange: (value: DropdownType | undefined) => void;
  label: string;
  labelPosition?: 'inline' | 'top';
};

const ServiceGroupDropdown = ({
  nodeId,
  appId,
  serviceGroupId,
  onChange,
  label,
  labelPosition = 'top',
}: ServiceGroupDropdownProps) => {
  const { data: serviceGroupList } = useGetResourceStatus({
    requestParams: { resource_type: 'SERVICE_GROUP', node_id: nodeId, group_id: appId },
    enable: !!(nodeId && appId),
    onSuccess: (sgList) => {
      const firstSg = sgList?.[0];
      onChange(firstSg ? { label: firstSg.physical_name, value: firstSg.resource_id } : undefined);
    },
  });

  const serviceGroupListDropdown: DropdownType[] = useMemo(() => {
    const convertedGroups: DropdownType[] = serviceGroupList?.length
      ? serviceGroupList.map((resource) => {
          return {
            label: resource.physical_name,
            value: resource.resource_id,
          };
        })
      : [];
    return convertedGroups;
  }, [serviceGroupList]);

  const onSelectSg = (e: SelectChangeEvent<unknown>) => {
    const sgId = e.target.value || '';
    const sg = serviceGroupListDropdown.find((sg) => sg.value === sgId);
    onChange(sg);
  };

  useEffect(() => {
    onChange(undefined);
  }, [appId]);

  return (
    <CmDropdown
      label={label}
      data={serviceGroupListDropdown}
      onChange={onSelectSg}
      value={serviceGroupId}
      labelPosition={labelPosition}
      width="300px"
      labelStyle={{ marginBottom: 1 }}
    />
  );
};

export default ServiceGroupDropdown;
