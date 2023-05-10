import AlbumInterface from '@/contracts/AlbumInterface';
import { useAddPhotoMutation, useFetchPhotosQuery } from '@/store';
import PhotosListItem from '@/components/PhotosListItem';
import { Box, ImageList, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AddIcon from '@mui/icons-material/Add';
import PhotosListSkeleton from './PhotosListSkeleton';
import { grey } from '@mui/material/colors';

type PhotosListProps = {
  album: AlbumInterface
}

function PhotosList({ album }: PhotosListProps) {
  const { data: photos, isFetching, error } = useFetchPhotosQuery(album);
  const [ addPhoto, { isLoading } ] = useAddPhotoMutation();

  const handleAddAlbum = () => {
    addPhoto(album);
  };

  let content: JSX.Element | JSX.Element[] | null;

  if (isFetching) {
    content = <PhotosListSkeleton items={3} />;
  } else if (error) {
    content = <div>Error...</div>;
  } else if (photos?.length) {
    content = (
      <>
        <ImageList cols={3} gap={8} sx={{ justifyContent: 'space-between' }}>
          {photos?.map(photo => <PhotosListItem key={photo.id} photo={photo} />)}
        </ImageList>
        <Box mt={1} fontSize={14} color={grey[500]}>Tip: Double click to delete the photo.</Box>
      </>
    );
  } else {
    content = null;
  }

  return (
    <>
      <Stack direction='row' alignItems='center' justifyContent='space-between' mb={2}>
        <Typography>Photos in {album.title}</Typography>

        <Box>
          <LoadingButton
            disableElevation
            onClick={handleAddAlbum}
            startIcon={<AddIcon />}
            loading={isLoading}
            loadingPosition="start"
            variant="contained"
            sx={{ textTransform: 'unset' }}
          >
            <span>Add photo</span>
          </LoadingButton>
        </Box>
      </Stack>

      {content}
    </>
  );
}

export default PhotosList;