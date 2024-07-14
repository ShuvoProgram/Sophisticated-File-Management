// /redux/api/userApi.ts
import { setToLocalStorage } from "@/lib/localStorage/localStorage";
import { api } from "../../api/api";
import { setToken } from "./userSlice";

export const userApi = api.injectEndpoints({
  endpoints: (builder: any) => ({
    registerUser: builder.mutation({
      query: (data: any) => ({
        url: `/users/register`,
        method: `POST`,
        body: data,
      }),
      invalidatesTags: ["editor", "admins", "viewer", "user"],
    }),
    loginUser: builder.mutation({
      query: (credential: any) => ({
        url: "/users/login",
        method: `POST`,
        body: credential,
      }),
      async onQueryStarted(arg: any, { dispatch, queryFulfilled }: any) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data?.accessToken) {
            setToLocalStorage("accessToken", data.data.accessToken);
            dispatch(setToken(data.data.accessToken));
          } else {
            console.error("No accessToken in response", data);
          }
        } catch (error) {
          console.error("Login error: ", error);
        }
      },
    }),
    updateProfilePicture: builder.mutation({
      query: (data: any) => ({
        url: "/users/update-profile",
        method: `POST`,
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    updateProfileData: builder.mutation({
      query: (data: any) => ({
        url: "/users/update-profile-data",
        method: `POST`,
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    deleteProfileData: builder.mutation({
      query: (id: any) => ({
        url: `/users/${id}`,
        method: `DELETE`,
      }),
      invalidatesTags: ["user"],
    }),
    updateProfile: builder.mutation({
      query: ({ id, data }: any) => ({
        url: `/users/${id}`,
        method: `PATCH`,
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    makeAdmin: builder.mutation({
      query: ({ email, role }: any) => ({
        url: `/user/admin/update-role/${email}`,
        method: `PATCH`,
        body: role,
      }),
      invalidatesTags: ["user", "admins"],
    }),
    getAllUser: builder.query({
      query: (page: any) => ({
        url: `/user/all-users?page=${page}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getAllAdmin: builder.query({
      query: (page: any) => ({
        url: `/user/admins?page=${page}`,
        method: "GET",
      }),
      providesTags: ["admins", "user"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useUpdateProfileMutation,
  useMakeAdminMutation,
  useUpdateProfilePictureMutation,
  useUpdateProfileDataMutation,
  useDeleteProfileDataMutation,
  useGetAllUserQuery,
  useGetAllAdminQuery,
} = userApi;