import { api } from "../../api/api";

export const FileApi = api.injectEndpoints({
  endpoints: (builder: any) => ({
    createFile: builder.mutation({
      query: (data: any) => ({
        url: "/file/upload",
        method: `POST`,
        body: data,
      }),
      invalidatesTags: ["file"],
    }),
    getFile: builder.query({
      query: () => ({
        url: `/file`,
        method: "GET",
      }),

      providesTags: ["file"],
    }),
  }),
});

export const {
  useCreateFileMutation,
  useGetFileQuery,
} = FileApi;
