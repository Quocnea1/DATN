// import { AUTHENTICATION } from '@/utils/constants/endpoints';
// import { LoginDto } from '@/utils/types/dtos/auth';
// import { OpsUserPermissionResponse } from '@/utils/types/dtos/permissionDto';
// import { LoginEntity } from '@/utils/types/entities/auth';

// import { getAxiosInstance, getResponseData } from '@/config/axios';

// export const loginMutation = {
//   name: 'login',
//   fn: async (data: LoginEntity): Promise<LoginDto> => {
//     const responseData = getResponseData<LoginDto>(
//       await getAxiosInstance().get(AUTHENTICATION.USER_INFO_CHECK, {
//         params: {
//           [JSON.stringify({
//             dto: { ...data },
//           })]: '',
//           _: new Date().getTime(),
//         },
//       })
//     );

//     return responseData;
//   },
// };

// export const checkUserEncryption = async (userId: string) => {
//   const res = getResponseData<LoginDto>(
//     await getAxiosInstance().get(AUTHENTICATION.ENCRYPTION_INFO_CHECK, {
//       params: {
//         [JSON.stringify({
//           dto: { user_id: userId },
//         })]: '',
//         _: new Date().getTime(),
//       },
//     })
//   );

//   return res;
// };

// export const opsUserPermission = async (userId: string) => {
//   const res = getResponseData<OpsUserPermissionResponse>(
//     await getAxiosInstance().get(AUTHENTICATION.OPS_USER_PERMISSION, {
//       params: {
//         [JSON.stringify({
//           dto: { user_id: userId },
//         })]: '',
//         _: new Date().getTime(),
//       },
//     })
//   );

//   return res;
// };
