import { ReactNode, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Stack, Box, IconButton, IconButtonProps, Collapse, Card, SxProps } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { grey } from '@mui/material/colors';

type CollapseCardProps = {
  title: JSX.Element;
  children: JSX.Element | ReactNode;
  sx?: SxProps
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

function CollapseCard({ title, children, sx }: CollapseCardProps) {
  const [ expanded, setExpanded ] = useState<boolean>(false);

  const handleExpandClick = (): void => {
    setExpanded(prevExpanded => !prevExpanded);
  };

  return (
    <Card
      sx={{
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
        borderRadius: 1,
        ...sx
      }}
    >
      <Stack
        justifyContent='space-between'
        direction='row'
        sx={{
          p: 2,
          borderBottom: `1px solid ${expanded ? grey[300] : 'transparent'}`,
          transition: 'border-color .3s ease'
        }}
      >
        {title}
        <Box>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </Box>
      </Stack>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box p={2}>
          {children}
        </Box>
      </Collapse>
    </Card>
  );
}

export default CollapseCard;
