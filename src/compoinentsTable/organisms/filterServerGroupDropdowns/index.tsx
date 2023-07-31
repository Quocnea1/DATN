import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Button, SelectChangeEvent, Stack, SxProps, Theme } from '@mui/material';

import { CmDropdown } from '@/components/atoms/DataInput';
import {
  FilterServerGroupEmitValues,
  FilterServerGroupFormType,
} from '@/components/organisms/filterServerGroupDropdowns/types';

import { useGetNodeList } from '@/apis/hooks/node.hook';
import { useGetResourceStatus } from '@/apis/hooks/resource.hook';
import { DropdownType } from '@/utils/types/common';

interface filterServerGroupDropdownsProps {
  verticalRender?: boolean;
  isShowServiceGroup?: boolean;
  isShowApplication?: boolean;
  controlStyle?: SxProps<Theme>;
  onSearchChange: (values: FilterServerGroupEmitValues) => void;
  labelPosition?: 'top' | 'inline';
  isChangeOnSelect?: boolean;
  isAutoSelectFirstTime?: boolean;
}

const nodeListDefaultFilter = {};

const FilterServerGroupDropdowns = ({
  isShowApplication = true,
  isShowServiceGroup = true,
  verticalRender = false,
  onSearchChange,
  controlStyle,
  labelPosition = 'top',
  isChangeOnSelect = false,
  isAutoSelectFirstTime = false,
}: filterServerGroupDropdownsProps) => {
  const { control, handleSubmit, watch, setValue } = useForm<FilterServerGroupFormType>({
    mode: 'onChange',
    values: { nodeId: '', appId: '', serviceGroupId: '' },
  });

  const [selectedNodeId, selectedAppId, serviceGroupId] = watch(['nodeId', 'appId', 'serviceGroupId']);

  const isDisabledSearchBtn =
    !selectedNodeId || (isShowApplication && !selectedAppId) || (isShowServiceGroup && !serviceGroupId);

  const { data: nodeList } = useGetNodeList(nodeListDefaultFilter);
  const nodeListDropdown: DropdownType[] = useMemo(() => {
    const convertedNodes: DropdownType[] = nodeList?.length
      ? nodeList.map((node) => {
          return {
            label: node.node_name,
            value: node.node_id,
          };
        })
      : [];
    return convertedNodes;
  }, [nodeList]);

  const { data: appList } = useGetResourceStatus({
    requestParams: { resource_type: 'APPLICATION', node_id: selectedNodeId },
    enable: !!selectedNodeId,
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

  const { data: serviceGroupList } = useGetResourceStatus({
    requestParams: { resource_type: 'SERVICE_GROUP', node_id: selectedNodeId, group_id: selectedAppId },
    enable: !!(!!selectedNodeId && !!selectedAppId),
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

  const onSubmitSearchFilterGroups = (formValues: FilterServerGroupFormType) => {
    const { nodeId, appId, serviceGroupId } = formValues;
    const node = nodeList?.find((item) => item.node_id === nodeId);
    const app = appList?.find((item) => item.resource_id === appId);
    const serviceGroup = serviceGroupList?.find((item) => item.resource_id === serviceGroupId);
    const emitValues: FilterServerGroupEmitValues = {
      node: node,
      app: app,
      serviceGroup: serviceGroup,
    };
    onSearchChange(emitValues);
  };

  useEffect(() => {
    if (appList) {
      setValue('appId', appList?.[0]?.resource_id || '');
    }
  }, [appList]);

  useEffect(() => {
    if (serviceGroupList) {
      setTimeout(() => {
        setValue('serviceGroupId', serviceGroupList?.[0]?.resource_id || '');
      });
    }
  }, [serviceGroupList]);

  useEffect(() => {
    if (isChangeOnSelect) {
      const formValues: FilterServerGroupFormType = {
        nodeId: selectedNodeId,
        appId: selectedAppId,
        serviceGroupId: serviceGroupId,
      };
      onSubmitSearchFilterGroups(formValues);
    }
  }, [selectedNodeId, serviceGroupId, selectedAppId]);

  // select default
  useEffect(() => {
    if (isAutoSelectFirstTime && nodeList?.length) {
      setValue('nodeId', nodeList[0].node_id);
    }
  }, [nodeList]);

  return (
    <Stack
      flexDirection={verticalRender ? 'column' : 'row'}
      alignItems="center"
      justifyContent="space-between"
    >
      <Stack
        flexDirection={verticalRender ? 'column' : 'row'}
        gap={4}
        width={'100%'}
      >
        <Controller
          name="nodeId"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <CmDropdown
              label="Node"
              data={nodeListDropdown}
              onChange={onChange as (event: SelectChangeEvent<unknown>) => void}
              value={value}
              labelPosition={labelPosition}
              haveDefaultErrorSpace={false}
              sx={controlStyle ?? { width: '300px' }}
              labelStyle={{ marginBottom: 1 }}
            />
          )}
        />

        {isShowApplication && (
          <Controller
            name="appId"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <CmDropdown
                label="Application"
                data={appListDropdown}
                onChange={onChange as (event: SelectChangeEvent<unknown>) => void}
                value={value}
                labelPosition={labelPosition}
                haveDefaultErrorSpace={false}
                sx={controlStyle ?? { width: '300px' }}
                labelStyle={{ marginBottom: 1 }}
              />
            )}
          />
        )}

        {isShowApplication && isShowServiceGroup && (
          <Controller
            name="serviceGroupId"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <CmDropdown
                label="Service Group"
                data={serviceGroupListDropdown}
                onChange={onChange as (event: SelectChangeEvent<unknown>) => void}
                value={value}
                labelPosition={labelPosition}
                haveDefaultErrorSpace={false}
                sx={controlStyle ?? { width: '300px' }}
                labelStyle={{ marginBottom: 1 }}
              />
            )}
          />
        )}
      </Stack>

      {!isChangeOnSelect && (
        <Button
          variant="contained"
          sx={{ alignSelf: 'end' }}
          onClick={handleSubmit(onSubmitSearchFilterGroups)}
          disabled={isDisabledSearchBtn}
        >
          Search
        </Button>
      )}
    </Stack>
  );
};

export default FilterServerGroupDropdowns;
