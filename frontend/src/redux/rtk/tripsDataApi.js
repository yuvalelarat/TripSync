import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:10000/trips';

export const tripsDataApi = createApi({
    reducerPath: 'tripsDataApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().userData.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getMyTrips: builder.query({
            query: () => ({
                url: '/my-trips',
                method: 'GET',
            }),
            transformResponse: (response) => response.trips,
        }),
        getSharedTrips: builder.query({
            query: () => ({
                url: '/shared-trips',
                method: 'GET',
            }),
            transformResponse: (response) => response.trips,
        }),
        getTrip: builder.query({
            query: (trip_id) => ({
                url: `/get-trip/${trip_id}`,
                method: 'GET',
            }),
            transformResponse: (response) => response,
        }),
        createTrip: builder.mutation({
            query: (tripData) => ({
                url: '/new-trip',
                method: 'POST',
                body: tripData,
            }),
            transformResponse: (response) => response.trip,
        }),
        deleteTrip: builder.mutation({
            query: ({ trip_id }) => ({
                url: `/delete-trip/${trip_id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetMyTripsQuery,
    useGetSharedTripsQuery,
    useLazyGetTripQuery,
    useCreateTripMutation,
    useDeleteTripMutation,
} = tripsDataApi;
