// import { useMutation, UseMutationResult } from '@tanstack/react-query';
// import Cookies from 'universal-cookie';

// import { loginMutation } from '@/apis/auth.api';
// import { AUTHENTICATION_COOKIE, LOCAL_STORAGE_PERMISSION, PERMISSION_COOKIE } from '@/utils/constants/authentication';
// import { IErrorResponse } from '@/utils/types/common';
// import { LoginDto } from '@/utils/types/dtos/auth';
// import { LoginEntity } from '@/utils/types/entities/auth';

// // import { COOKIE_EXPIRE_TIME } from '@/constants';

// const cookies = new Cookies();

// export const useLogin = ({
//   onSuccess,
//   onError,
// }: {
//   onSuccess?: () => void;
//   onError?: (err: IErrorResponse) => void;
// }): UseMutationResult<LoginDto, IErrorResponse, LoginEntity, unknown> => {
//   return useMutation<LoginDto, IErrorResponse, LoginEntity>({
//     mutationFn: async (data: LoginEntity): Promise<LoginDto> => {
//       return await loginMutation.fn(data);
//     },
//     onSuccess: async () => {
//       onSuccess?.();
//     },
//     onError: (err) => {
//       onError?.(err);
//     },
//   });
// };

// export const useLogout = (): UseMutationResult<unknown, unknown> => {
//   return useMutation<unknown, unknown, unknown>({
//     mutationFn: async () => {
//       cookies.remove(AUTHENTICATION_COOKIE);
//       cookies.remove(PERMISSION_COOKIE);
//       localStorage.removeItem(LOCAL_STORAGE_PERMISSION);
//       window.location.href = '/';

//       return;
//     },
//   });
// };
