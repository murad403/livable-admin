import baseApi from "@/redux/api/api";
import { TClient, TCreateClientInput, TRequestedClient } from "./app.type";

const appApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getClients: builder.query<TClient[], void>({
            query: () => ({
                url: "/clients/",
                method: "GET",
            }),
            providesTags: ["Clients"],
        }),
        createClient: builder.mutation<TClient, TCreateClientInput>({
            query: (data) => ({
                url: "/clients/create/",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Clients"],
        }),
        getRequestedClients: builder.query<TRequestedClient[], void>({
            query: () => ({
                url: "/anonymous/book/list/",
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetClientsQuery,
    useCreateClientMutation,
    useGetRequestedClientsQuery,
} = appApi;