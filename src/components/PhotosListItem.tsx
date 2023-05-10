import PhotoInterface from '@/contracts/PhotoInterface';
import { useRemovePhotoMutation } from '@/store';
import { Box, ButtonBase, CircularProgress, ImageListItem } from '@mui/material';
import { grey } from '@mui/material/colors';

type PhotosListItemProps = {
  photo: PhotoInterface
}

function PhotosListItem({ photo }: PhotosListItemProps): JSX.Element {
  const [ removePhoto, { isLoading } ] = useRemovePhotoMutation();

  return (
    <ImageListItem>
      <ButtonBase
        onDoubleClick={() => removePhoto(photo)}
        sx={{ position: 'relative', overflow: 'hidden', borderRadius: '4px', width: '150px', height: '150px' }}
      >
        <img
          src={photo.url}
          alt="photo"
          loading='lazy'
        />
        {
          isLoading &&
          <Box
            position='absolute'
            top={0}
            bottom={0}
            left={0}
            right={0}
            display='flex'
            justifyContent='center'
            alignItems='center'
            sx={{ background: 'rgba(0, 0, 0, 0.5)' }}
          >
            <CircularProgress size={25} sx={{ color: grey[400] }} />
          </Box>
        }
      </ButtonBase>
    </ImageListItem>
  );
}
export default PhotosListItem;