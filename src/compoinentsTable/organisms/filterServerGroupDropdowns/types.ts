import { NodeDto } from '@/utils/types/dtos/node.dto';
import { ResourceDto } from '@/utils/types/dtos/resource.dto';

export type FilterServerGroupFormType = {
  nodeId?: string;
  appId?: string;
  serviceGroupId?: string;
};

export type FilterServerGroupEmitValues<TExpandData = void> = {
  node?: NodeDto;
  app?: ResourceDto;
  serviceGroup?: ResourceDto;
  expandFilterData?: TExpandData;
  serviceObject?: ResourceDto;
  clickId?: string;
};
