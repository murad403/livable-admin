import baseApi from "@/redux/api/api";
import {
    TClient,
    TCreateClientInput,
    TRequestedClient,
    TScoutingTrip,
    TCreateScoutingTripInput,
    TUpdateScoutingTripInput,
    TDeleteScoutingTripInput,
} from "./app.type";

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
        getScoutingTrips: builder.query<TScoutingTrip[], void>({
            query: () => ({
                url: "/trips/",
                method: "GET",
            }),
            providesTags: ["Trips"],
        }),
        createScoutingTrip: builder.mutation<TScoutingTrip, TCreateScoutingTripInput>({
            query: ({ clientId, data }) => ({
                url: `/clients/${clientId}/trips/`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Trips"],
        }),
        updateScoutingTrip: builder.mutation<TScoutingTrip, TUpdateScoutingTripInput>({
            query: ({ clientId, id, data }) => ({
                url: `/clients/${clientId}/trips/${id}/`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Trips"],
        }),
        deleteScoutingTrip: builder.mutation<void, TDeleteScoutingTripInput>({
            query: ({ clientId, id }) => ({
                url: `/clients/${clientId}/trips/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Trips"],
        }),
    }),
});

export const {
    useGetClientsQuery,
    useCreateClientMutation,
    useGetRequestedClientsQuery,
    useGetScoutingTripsQuery,
    useCreateScoutingTripMutation,
    useUpdateScoutingTripMutation,
    useDeleteScoutingTripMutation,
} = appApi;