import { useAppSelector } from '@/hooks/useAppSelector.ts';
import { addUser, fetchUsers } from '@/store';
import { useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useThunk } from '@/hooks/useThunk';
import AddIcon from '@mui/icons-material/Add';
import LoadingButton from '@mui/lab/LoadingButton';
import UsersListItem from '@/components/UsersListItem';
import UsersListSkeleton from '@/components/UsersListSkeleton';
import { grey } from '@mui/material/colors';

function UsersList(): JSX.Element {
  const { data: users } = useAppSelector((state) => {
    return state.users;
  });

  const [ doFetchUsers, isLoadingUsers, loadingUsersError ] = useThunk(fetchUsers);

  const [ doAddUser, isAddingUser ] = useThunk(addUser);

  useEffect(() => {
    doFetchUsers();
  }, [ doFetchUsers ]);

  function handleAddUser(): void {
    doAddUser();
  }

  let content: JSX.Element[] | JSX.Element;

  if (isLoadingUsers) {
    content =  <UsersListSkeleton items={5} />;
  } else if (loadingUsersError) {
    content = <Box>Error</Box>;
  } else if (!users.length) {
    content = <Stack alignItems='center' color={grey[600]}>There is no users yet...</Stack>;
  } else {
    content = users.map((user) => (
      <UsersListItem key={user.id} user={user} />
    ));
  }

  return (
    <>
      <Stack direction='row' alignItems='center' justifyContent='space-between' mt={5} mb={2}>
        <Typography component='h3' variant='h6'>Users List</Typography>

        <Box>
          <LoadingButton
            disableElevation
            onClick={handleAddUser}
            startIcon={<AddIcon />}
            loading={isAddingUser}
            loadingPosition="start"
            variant="contained"
            sx={{ textTransform: 'unset' }}
          >
            <span>Add user</span>
          </LoadingButton>
        </Box>
      </Stack>

      {content}
    </>
  );
}

export default UsersList;