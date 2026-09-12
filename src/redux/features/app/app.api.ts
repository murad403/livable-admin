import baseApi from "@/redux/api/api";
import { TClient, TCreateClientInput } from "./app.type";

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
    }),
});

export const {
    useGetClientsQuery,
    useCreateClientMutation,
} = appApi;