import { useMemo } from 'react';

import { SelectChangeEvent } from '@mui/material';

import { CmDropdown } from '@/components/atoms/DataInput';

import { useGetNodeList } from '@/apis/hooks/node.hook';
import { DropdownType } from '@/utils/types/common';

type NodeDropdownProps = {
  nodeId: string;
  onChange: (value: DropdownType | undefined) => void;
  label: string;
  labelPosition?: 'inline' | 'top';
  fullWidth?: boolean;
};

const NodeDropdown = ({ nodeId, onChange, label, labelPosition = 'top', fullWidth }: NodeDropdownProps) => {
  const { data: nodeList } = useGetNodeList({
    onSuccess: (nodes) => {
      const firstNodeInList = nodes?.[0];
      if (firstNodeInList) {
        onChange({
          label: firstNodeInList.node_name,
          value: firstNodeInList.node_id,
        });
      }
    },
  });

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

  const onSelectNode = (e: SelectChangeEvent<unknown>) => {
    const nodeId = e.target.value || '';
    const node = nodeListDropdown.find((node) => node.value === nodeId);
    onChange(node);
  };

  return (
    <CmDropdown
      label={label}
      data={nodeListDropdown}
      onChange={onSelectNode}
      value={nodeId}
      labelPosition={labelPosition}
      width={fullWidth ? '100%' : '300px'}
      labelStyle={{ marginBottom: 1 }}
    />
  );
};

export default NodeDropdown;
