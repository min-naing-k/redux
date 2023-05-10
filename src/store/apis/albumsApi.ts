import AlbumInterface from '@/contracts/AlbumInterface';
import UserInterface from '@/contracts/UserInterface';
import { pause } from '@/helpers';
import { faker } from '@faker-js/faker';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
    fetchFn: async(...args) => {
      await pause(2000);

      return fetch(...args);
    }
  }),
  endpoints(builder) {
    return {
      fetchAlbums: builder.query<AlbumInterface[], UserInterface>({
        query: (user) => ({
          url: '/albums',
          params: {
            userId: user.id
          },
          method: 'GET'
        }),
        providesTags: (result, _, user) => {
          const tags = result?.map(album => ({ type: 'Albums', id: album.id }));
          tags?.push({ type: 'UserAlbums', id: user.id });
          return tags;
        }
      }),
      addAlbum: builder.mutation<AlbumInterface, UserInterface>({
        query: (user) => ({
          url: '/albums',
          method: 'POST',
          body: {
            userId: user.id,
            title: faker.commerce.productName()
          }
        }),
        invalidatesTags: (_, __, user) => [ { type: 'UserAlbums', id: user.id } ]
      }),
      removeAlbum: builder.mutation<void, AlbumInterface>({
        query: (album) => ({
          url: `/albums/${album.id}`,
          method: 'DELETE'
        }),
        invalidatesTags: (_, __, album) => [ { type: 'Albums', id: album.id } ]
      })
    };
  }
});

export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation
} = albumsApi;

export { albumsApi };