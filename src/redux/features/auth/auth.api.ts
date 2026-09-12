import baseApi from "@/redux/api/api";
import { TChangePasswordInput, TChangePasswordResponse, TSignInInput, TSignInResponse } from "./auth.type";

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
    })
})

export const {
    useSignInMutation,
    useChangePasswordMutation,
} = authApi;