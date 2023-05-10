import { ImageList, ImageListItem, Skeleton } from '@mui/material';

type PhotosListSkeletonProps = {
  items: number
}

function PhotosListSkeleton({ items }: PhotosListSkeletonProps) {
  return (
    <ImageList cols={3} gap={8}>
      {
        Array.from({ length: items }).map((_, index) => (
          <ImageListItem key={index}>
            <Skeleton variant="rounded" width={150} height={150} />
          </ImageListItem>
        ))
      }
    </ImageList>
  );
}
export default PhotosListSkeleton;