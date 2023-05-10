import AlbumInterface from '@/contracts/AlbumInterface';
import PhotoInterface from '@/contracts/PhotoInterface';
import { pause } from '@/helpers';
import { faker } from '@faker-js/faker';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const photosApi = createApi({
  reducerPath: 'photos',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
    fetchFn: async(...args) => {
      await pause(1000);
      return fetch(...args);
    }
  }),
  endpoints(builder) {
    return {
      fetchPhotos: builder.query<PhotoInterface[], AlbumInterface>({
        query: (album) => ({
          url: '/photos',
          method: 'GET',
          params: {
            albumId: album.id
          }
        }),
        providesTags: (result, _, album) => {
          const tags = result?.map(photo => ({ type: 'Photos', id: photo.id }));
          tags?.push({ type: 'AlbumPhotos', id: album.id });
          return tags;
        }
      }),
      addPhoto: builder.mutation<PhotoInterface, AlbumInterface>({
        query: (album) => ({
          url: '/photos',
          method: 'POST',
          body: {
            albumId: album.id,
            url: faker.image.abstract(150, 150, true)
          }
        }),
        invalidatesTags: (_, __, album) => [ { type: 'AlbumPhotos', id: album.id } ]
      }),
      removePhoto: builder.mutation<void, PhotoInterface>({
        query: (photo) => ({
          url: `/photos/${photo.id}`,
          method: 'DELETE'
        }),
        invalidatesTags: (_, __, photo) => [ { type: 'Photos', id: photo.id } ]
      })
    };
  }
});

export { photosApi };
export const { useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation } = photosApi;