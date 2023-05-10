import UserInterface from '@/contracts/UserInterface';
import CollapseCard from './CollapseCard';
import { Box, CircularProgress, IconButton, Stack, Typography } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import { useThunk } from '@/hooks/useThunk';
import { removeUser } from '@/store';
import AlbumsList from '@/components/AlbumsList';

type UsersListItemProps = {
  user: UserInterface
};

function UsersListItem({ user }: UsersListItemProps): JSX.Element {
  const [ doRemoveUser, isLoading ] = useThunk(removeUser);

  const handleRemoveUser = (): void => {
    doRemoveUser(user);
  };

  const title = (
    <Stack direction='row' gap={2} alignItems='start'>
      <Box>
        <IconButton
          onClick={handleRemoveUser}
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
        <Typography component='h3' noWrap>{user.name}</Typography>
        <Typography noWrap color={grey[600]}>{user.email}</Typography>
      </Stack>
    </Stack>
  );

  return (
    <CollapseCard
      sx={{ mb: 2 }}
      key={user.id}
      title={title}
    >
      <AlbumsList user={user} />
    </CollapseCard>
  );
}

export default UsersListItem;