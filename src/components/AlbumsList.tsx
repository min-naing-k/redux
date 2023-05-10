import UserInterface from '@/contracts/UserInterface';
import { useFetchAlbumsQuery, useAddAlbumMutation } from '@/store';
import UsersListSkeleton from './UsersListSkeleton';
import { Box, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AddIcon from '@mui/icons-material/Add';
import AlbumsListItem from '@/components/AlbumsListItem';

type AlbumsListProps = {
  user: UserInterface
}

function AlbumsList({ user }: AlbumsListProps) {
  const { data: albums, isFetching, error } = useFetchAlbumsQuery(user);

  const [ addAlbum, { isLoading: isAddingAlbum } ] = useAddAlbumMutation();

  const handleAddAlbum = () => {
    addAlbum(user);
  };

  let content: JSX.Element[] | JSX.Element | undefined;

  if (isFetching) {
    content = <UsersListSkeleton items={1} />;
  } else if (error) {
    content = <div>Error when fetching albums.</div>;
  } else {
    content = albums?.map(album => (
      <AlbumsListItem key={album.id} album={album} user={user} />
    ));
  }

  return (
    <>
      <Stack direction='row' alignItems='center' justifyContent='space-between' mb={2}>
        <Typography>Albums of {user.name}</Typography>

        <Box>
          <LoadingButton
            disableElevation
            onClick={handleAddAlbum}
            startIcon={<AddIcon />}
            loading={isAddingAlbum}
            loadingPosition="start"
            variant="contained"
            sx={{ textTransform: 'unset' }}
          >
            <span>Add album</span>
          </LoadingButton>
        </Box>
      </Stack>

      {content}
    </>
  );
}
export default AlbumsList;