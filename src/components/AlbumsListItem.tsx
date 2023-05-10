import { Box, CircularProgress, IconButton, Stack, Typography } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import CollapseCard from '@/components/CollapseCard';
import AlbumInterface from '@/contracts/AlbumInterface';
import UserInterface from '@/contracts/UserInterface';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRemoveAlbumMutation } from '@/store';
import PhotosList from '@/components/PhotosList';

type AlbumsListItemProps = {
  album: AlbumInterface;
  user: UserInterface
};

function AlbumsListItem({ album, user }: AlbumsListItemProps): JSX.Element {
  const [ removeAlbum, { isLoading } ] = useRemoveAlbumMutation();

  const handleRemoveAlbum = () => {
    removeAlbum(album);
  };

  const title = (
    <Stack direction='row' gap={2} alignItems='start'>
      <Box>
        <IconButton
          onClick={handleRemoveAlbum}
          color='error'
          disabled={isLoading}
          sx={{
            width: 40,
            height: 40,
            background: red[50],
            '&:hover': { background: red[50] },
            '&:disabled': { background: red[50] }
          }}
        >
          {isLoading && <CircularProgress color='error' size={20} />}
          {!isLoading && <DeleteIcon />}
        </IconButton>
      </Box>
      <Stack sx={{ minWidth: 0 }}>
        <Typography component='h3' noWrap>{album.title}</Typography>
        <Typography noWrap color={grey[600]}>{user.name}</Typography>
      </Stack>
    </Stack>
  );

  return (
    <CollapseCard sx={{ mb: 2, '&:last-child': { mb: 0 } }} title={title}>
      <PhotosList album={album} />
    </CollapseCard>
  );
}

export default AlbumsListItem;