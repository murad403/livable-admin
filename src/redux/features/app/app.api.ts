import baseApi from "@/redux/api/api";
import {
    TClient,
    TCreateClientInput,
    TRequestedClient,
    TScoutingTrip,
    TScoutingTripsResponse,
    TCreateScoutingTripInput,
    TUpdateScoutingTripInput,
    TDeleteScoutingTripInput,
    TCityTest,
    TCreateCityTestInput,
    TUpdateCityTestInput,
    TSchedule,
    TScheduleItem,
    TCreateScheduleInput,
    TUpdateScheduleItemInput,
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
        getScoutingTrips: builder.query<TScoutingTripsResponse, void>({
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
        getUpcomingTrips: builder.query<TScoutingTrip[], void>({
            query: () => ({
                url: "/trips/upcoming/",
                method: "GET",
            }),
            providesTags: ["Trips"],
        }),
        getCityTests: builder.query<TCityTest[], void>({
            query: () => ({
                url: "/admin/city-tests/",
                method: "GET",
            }),
            providesTags: ["CityTests"],
        }),
        createCityTest: builder.mutation<TCityTest, TCreateCityTestInput>({
            query: (data) => ({
                url: "/admin/city-tests/",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["CityTests"],
        }),
        updateCityTest: builder.mutation<TCityTest, TUpdateCityTestInput>({
            query: ({ id, data }) => ({
                url: `/admin/city-tests/${id}/`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["CityTests"],
        }),
        deleteCityTest: builder.mutation<void, string>({
            query: (id) => ({
                url: `/admin/city-tests/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["CityTests"],
        }),
        getSchedules: builder.query<TSchedule[], void>({
            query: () => ({
                url: "/admin/todays/",
                method: "GET",
            }),
            providesTags: ["Schedules"],
        }),
        createSchedule: builder.mutation<TSchedule, TCreateScheduleInput>({
            query: ({ clientId, data }) => ({
                url: `/admin/today/${clientId}/`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Schedules"],
        }),
        updateScheduleItem: builder.mutation<TScheduleItem, TUpdateScheduleItemInput>({
            query: ({ itemId, data }) => ({
                url: `/admin/today/item/${itemId}/`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Schedules"],
        }),
        deleteSchedule: builder.mutation<void, number>({
            query: (scheduleId) => ({
                url: `/admin/todays/${scheduleId}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Schedules"],
        }),
    }),
});

export const {
    useGetClientsQuery,
    useCreateClientMutation,
    useGetRequestedClientsQuery,
    useGetScoutingTripsQuery,
    useGetUpcomingTripsQuery,
    useCreateScoutingTripMutation,
    useUpdateScoutingTripMutation,
    useDeleteScoutingTripMutation,
    useGetCityTestsQuery,
    useCreateCityTestMutation,
    useUpdateCityTestMutation,
    useDeleteCityTestMutation,
    useGetSchedulesQuery,
    useCreateScheduleMutation,
    useUpdateScheduleItemMutation,
    useDeleteScheduleMutation,
} = appApi;