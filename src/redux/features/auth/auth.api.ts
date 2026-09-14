import baseApi from "@/redux/api/api";
import { TChangePasswordInput, TChangePasswordResponse, TSignInInput, TSignInResponse, TUser } from "./auth.type";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        signIn: builder.mutation<TSignInResponse, TSignInInput>({
            query: (data) => {
                return {
                    url: "/auth/login/",
                    method: "POST",
                    body: data
                }
            }
        }),
        changePassword: builder.mutation<TChangePasswordResponse, TChangePasswordInput>({
            query: (data) => {
                return {
                    url: "/auth/change-password/",
                    method: "POST",
                    body: data
                }
            }
        }),
        getMe: builder.query<TUser, void>({
            query: () => ({
                url: "/auth/me/",
                method: "GET",
            }),
            providesTags: ["User"],
        }),
        updateMe: builder.mutation<TUser, FormData>({
            query: (data) => ({
                url: "/auth/me/",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["User"],
        }),
    })
})

export const {
    useSignInMutation,
    useChangePasswordMutation,
    useGetMeQuery,
    useUpdateMeMutation,
} = authApi;