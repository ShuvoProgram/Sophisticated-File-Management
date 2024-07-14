// Need to use the React-specific entry point to import createApi
import {
    createApi,
    fetchBaseQuery,
  } from "@reduxjs/toolkit/query/react";
  import { RootState } from "../store";
  
  // Define a service using a base URL and expected endpoints
  export const api: any = createApi({
    reducerPath: "api",
    tagTypes: ["editor", "admins", "viewer", "file", "user"],
    baseQuery: fetchBaseQuery({
      baseUrl: process.env.NEXT_PUBLIC_BACKEND_API,
      prepareHeaders: (headers, { getState }: any) => {
        const token = (getState() as RootState)?.auth?.accessToken;
        headers.set("authorization", token as string);
        return headers;
      },
    }),
    endpoints: () => ({}),
  });
  