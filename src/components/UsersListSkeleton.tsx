import { Paper, Skeleton } from '@mui/material';

type UsersListSkeletonProps = {
  items: number;
}

function UsersListSkeleton({ items }: UsersListSkeletonProps) {
  return (
    <>
      {Array.from({ length: items }).map((_, index) => (
        <Paper
          key={index}
          elevation={0}
          sx={{
            p: 2,
            mb: 2,
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
            '&:last-child': { mb: 0 },
            height: 80
          }}>
          <Skeleton animation="wave" height={20} />
          <Skeleton animation="wave" width='50%' />
        </Paper>
      ))}
    </>
  );
}

export default UsersListSkeleton;
