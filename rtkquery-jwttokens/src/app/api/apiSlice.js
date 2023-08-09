import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    credentials: "include", //To include auth information in cookies
    //sets Authorization token to all the headers
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    }
})

//To get accessToken while sending the refreshtoken when accessToken expires
const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    //403 means the accessToken is expired
    if (result?.error?.originalStatus === 403) {
        console.log("Sending refresh token");
        //send the refresh token to get the new access token
        const refreshResult = await baseQuery('/refresh', api, extraOptions);
        console.log(refreshResult);

        if (refreshResult?.data) {
            const user = api.getState().auth.user;
            //store the new token
            api.dispatch(setCredentials({ ...refreshResult.data, user }))
            //retry the original query with the new access token
            result = await baseQuery(args, api, extraOptions);
        } else {
            //if the status code is not 403 then its unauthorizated
            api.dispatch(logOut())
        }
    }

    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})

