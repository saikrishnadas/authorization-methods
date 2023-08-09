import { apiSlice } from "../../app/api/apiSlice"

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            keepUnusedDataFor: 5, //cache for 5 secs, default 60 secs
        })
    })
})

export const {
    useGetUsersQuery
} = usersApiSlice 